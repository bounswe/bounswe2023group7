import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WriteCommentDto } from '../dtos/comment/request/write-comment.dto';
import { EditCommentDto } from '../dtos/comment/request/edit-comment.dto';
import { GetCommentResponseDto } from '../dtos/comment/response/get-comment.response.dto';
import { UserRepository } from '../repositories/user.repository';
import { CommentRepository } from '../repositories/comment.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commentRepository: CommentRepository,
  ) {}

  public async getComment(
    userId: string,
    commentId: string,
  ): Promise<GetCommentResponseDto> {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new HttpException(
        'No user found with this id',
        HttpStatus.FORBIDDEN,
      );
    }

    const comment = await this.commentRepository.findCommentById(commentId);

    if (!comment) {
      throw new HttpException(
        'No comment found with this id',
        HttpStatus.FORBIDDEN,
      );
    }
    return {
      author: comment.author,
      timestamp: comment.timestamp,
      edited: comment.edited,
      text: comment.text,
      parentId: comment.parentId,
      likeCount: comment.likedUsers.length,
      dislikeCount: comment.dislikedUsers.length,
    };
  }

  public async getCommentsByParent(
    userId: string,
    parentId: string,
  ): Promise<GetCommentResponseDto[]> {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new HttpException(
        'No user found with this id',
        HttpStatus.FORBIDDEN,
      );
    }

    return (await this.commentRepository.findCommentsByParent(parentId)).map(
      (comment) => {
        return {
          likeCount: comment.likedUsers.length,
          dislikeCount: comment.dislikedUsers.length,
          ...comment,
        };
      },
    );
  }

  public async writeComment(userId: string, writeCommentDto: WriteCommentDto) {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new HttpException(
        'No user found with this id',
        HttpStatus.FORBIDDEN,
      );
    }

    // check parent id
    // post / comment / game review
    // parent id should be the identifier of one of the above

    const comment = {
      author: user,
      text: writeCommentDto.text,
      parentId: writeCommentDto.parentId,
      likes: 0,
      dislikes: 0,
      timestamp: new Date(),
      likedUsers: [],
      dislikedUsers: [],
    };
    await this.commentRepository.createComment(comment);
  }

  public async likeComment(userId: string, commentId: string) {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new HttpException(
        'No user found with this id',
        HttpStatus.FORBIDDEN,
      );
    }

    const comment = await this.commentRepository.findCommentById(commentId);

    if (!comment) {
      throw new HttpException(
        'No comment found with this id',
        HttpStatus.FORBIDDEN,
      );
    }

    if (comment.likedUsers.find((likedUser) => likedUser.id === userId)) {
      comment.likedUsers = comment.likedUsers.filter(
        (likedUser) => likedUser.id !== userId,
      );
    } else if (
      comment.dislikedUsers.find((dislikedUser) => dislikedUser.id === userId)
    ) {
      comment.dislikedUsers = comment.dislikedUsers.filter(
        (dislikedUser) => dislikedUser.id !== userId,
      );
      comment.likedUsers.push(user);
    } else {
      comment.likedUsers.push(user);
    }

    await this.commentRepository.save(comment);
  }

  public async dislikeComment(userId: string, commentId: string) {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new HttpException(
        'No user found with this id',
        HttpStatus.FORBIDDEN,
      );
    }

    const comment = await this.commentRepository.findCommentById(commentId);

    if (!comment) {
      throw new HttpException(
        'No comment found with this id',
        HttpStatus.FORBIDDEN,
      );
    }

    if (
      comment.dislikedUsers.find((dislikedUser) => dislikedUser.id === userId)
    ) {
      comment.dislikedUsers = comment.dislikedUsers.filter(
        (dislikedUser) => dislikedUser.id !== userId,
      );
    } else if (
      comment.likedUsers.find((likedUser) => likedUser.id === userId)
    ) {
      comment.likedUsers = comment.likedUsers.filter(
        (likedUser) => likedUser.id !== userId,
      );
      comment.dislikedUsers.push(user);
    } else {
      comment.dislikedUsers.push(user);
    }

    await this.commentRepository.save(comment);
  }

  public async deleteComment(userId: string, commentId: string) {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new HttpException(
        'No user found with this id',
        HttpStatus.FORBIDDEN,
      );
    }

    const comment = await this.commentRepository.findCommentById(commentId);

    if (!comment) {
      throw new HttpException(
        'No comment found with this id',
        HttpStatus.FORBIDDEN,
      );
    }

    if (comment.author.id !== user.id) {
      throw new HttpException(
        'User is not the author, can not delete',
        HttpStatus.FORBIDDEN,
      );
    }

    await this.commentRepository.deleteComment(commentId);
  }

  public async editComment(
    userId: string,
    commentId: string,
    editCommentDto: EditCommentDto,
  ) {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new HttpException(
        'No user found with this id',
        HttpStatus.FORBIDDEN,
      );
    }

    const comment = await this.commentRepository.findCommentById(commentId);

    if (!comment) {
      throw new HttpException(
        'No comment found with this id',
        HttpStatus.FORBIDDEN,
      );
    }

    if (comment.author.id !== user.id) {
      throw new HttpException(
        'User is not the author, can not edit',
        HttpStatus.FORBIDDEN,
      );
    }

    await this.commentRepository.editComment(commentId, editCommentDto.newText);
  }
}
