import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { WriteCommentDto } from '../dtos/comment/request/write-comment.dto';
import { LikeCommentDto } from '../dtos/comment/request/like-comment.dto';
import { DislikeCommentDto } from '../dtos/comment/request/dislike-comment.dto';
import { UserRepository } from '../repositories/user.repository';
import { CommentRepository } from '../repositories/comment.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commentRepository: CommentRepository,
    ) {}

  public async writeComment(userId: string, writeCommentDto: WriteCommentDto) {
    let user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new HttpException(
        'No user found with this email',
        HttpStatus.FORBIDDEN,
      );
    }

    // check parent id
    // post / comment / game review
    // parent id should be the identifier of one of the above

    let comment = {
      author: userId, //user,
      text: writeCommentDto.text,
      parentId: writeCommentDto.parentId,
      likes: 0,
      dislikes: 0,
      timestamp: new Date(),
    }
    await this.commentRepository.createComment(comment);
  }

  public async likeComment(userId: string, likeCommentDto: LikeCommentDto) {
    let comment = await this.commentRepository.findCommentById(likeCommentDto.commentId);

    if (!comment) {
      throw new HttpException(
        'No comment found with this id',
        HttpStatus.FORBIDDEN,
      );
    }

    await this.commentRepository.incrementLikeCount(likeCommentDto.commentId);
  }

  public async dislikeComment(userId: string, dislikeCommentDto: DislikeCommentDto) {
    let comment = await this.commentRepository.findCommentById(dislikeCommentDto.commentId);

    if (!comment) {
      throw new HttpException(
        'No comment found with this id',
        HttpStatus.FORBIDDEN,
      );
    }

    await this.commentRepository.incrementDislikeCount(dislikeCommentDto.commentId);
  }
}
