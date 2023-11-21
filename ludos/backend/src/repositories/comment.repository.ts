import { Injectable } from '@nestjs/common';
import { Comment } from '../entities/comment.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  public async createComment(input: Partial<Comment>): Promise<Comment> {
    let comment = this.create(input);
    await this.insert(comment);
    return comment;
  }

  public findCommentById(id: string): Promise<Comment> {
    return this.findOneBy({ id });
    //return this.findOne({ where: {id}, relations: {likedUsers: true, dislikedUsers: true} });
  }
  
  public async deleteComment(commentId: string) {
    console.log("delete", commentId);
    let x = await this.delete({id: commentId});
    console.log(x);
  }

  public async editComment(commentId: string, newText: string) {
    let comment = await this.findCommentById(commentId);
    comment.text = newText;
    comment.edited = true;
    await this.save(comment);
  }

  public findCommentsByParent(parentId: string): Promise<Comment[]> {
    return this.findBy({ parentId });
  }

}
