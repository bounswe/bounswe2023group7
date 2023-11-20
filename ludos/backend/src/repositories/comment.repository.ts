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
  }

  public async incrementLikeCount(commentId: string) {
    let comment = await this.findCommentById(commentId);
    comment.likes += 1;
    await this.save(comment);
  }

  public async incrementDislikeCount(commentId: string) {
    let comment = await this.findCommentById(commentId);
    comment.dislikes += 1;
    await this.save(comment);
  }
}
