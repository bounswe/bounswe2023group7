import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { WriteCommentDto } from '../dtos/comment/request/write-comment.dto';
import { LikeCommentDto } from '../dtos/comment/request/like-comment.dto';
import { DislikeCommentDto } from '../dtos/comment/request/dislike-comment.dto';
import { CommentService } from '../services/comment.service';
import { AuthGuard } from '../services/guards/auth.guard';
import { AuthorizedRequest } from '../interfaces/common/authorized-request.interface';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @ApiOperation({ summary: 'Comment on a post' })
  @ApiOkResponse({
    description: 'Comment',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid Credentials',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/write-comment')
  public async writeComment(
    @Req() req: AuthorizedRequest,
    @Body() input: WriteCommentDto,
  ) {
    await this.commentService.writeComment(req.user.id, input);
  }

  @ApiOperation({ summary: 'Like a comment' })
  @ApiOkResponse({
    description: 'Like Comment',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid Credentials',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/like-comment')
  public async likeComment(
    @Req() req: AuthorizedRequest,
    @Body() input: LikeCommentDto,
  ) {
    await this.commentService.likeComment(req.user.id, input);
  }

  @ApiOperation({ summary: 'Dislike a comment' })
  @ApiOkResponse({
    description: 'Dislike Comment',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid Credentials',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/dislike-comment')
  public async dislikeComment(
    @Req() req: AuthorizedRequest,
    @Body() input: DislikeCommentDto,
  ) {
    await this.commentService.dislikeComment(req.user.id, input);
  }
}
