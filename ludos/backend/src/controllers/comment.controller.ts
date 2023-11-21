import {
  Body,
  Controller,
  HttpCode,
  Get,
  Post,
  Put,
  Delete,
  Req,
  UseGuards,
  Param,
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
import { EditCommentDto } from '../dtos/comment/request/edit-comment.dto';
import { GetCommentResponseDto } from '../dtos/comment/response/get-comment.response.dto';
import { CommentService } from '../services/comment.service';
import { AuthGuard } from '../services/guards/auth.guard';
import { AuthorizedRequest } from '../interfaces/common/authorized-request.interface';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Get comment details' })
  @ApiOkResponse({
    description: 'Comment details',
    type: GetCommentResponseDto,
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
  @Get(':commentId/info')
  public async getComment(
    @Req() req: AuthorizedRequest,
    @Param('commentId') commentId: string,
  ) {
    return await this.commentService.getComment(req.user.id, commentId);
  }

  @ApiOperation({ summary: 'Get comments of post/comment/review' })
  @ApiOkResponse({
    description: 'Comments of post/comment/review',
    type: [GetCommentResponseDto],
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
  @Get(':parentId')
  public async getCommentDetails(
    @Req() req: AuthorizedRequest,
    @Param('parentId') parentId: string,
  ) {
    return await this.commentService.getCommentsByParent(req.user.id, parentId);
  }

  @ApiOperation({ summary: 'Comment on a post/comment/review' })
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
  @Post(':commentId/like-comment')
  public async likeComment(
    @Req() req: AuthorizedRequest,
    @Param('commentId') commentId: string,
  ) {
    await this.commentService.likeComment(req.user.id, commentId);
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
  @Post(':commentId/dislike-comment')
  public async dislikeComment(
    @Req() req: AuthorizedRequest,
    @Param('commentId') commentId: string,
  ) {
    await this.commentService.dislikeComment(req.user.id, commentId);
  }

  @ApiOperation({ summary: 'Delete a comment' })
  @ApiOkResponse({
    description: 'Deleted Comment',
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
  @Delete(':commentId/delete-comment')
  public async deleteComment(
    @Req() req: AuthorizedRequest,
    @Param('commentId') commentId: string,
  ) {
    console.log('comment id: ', commentId);
    await this.commentService.deleteComment(req.user.id, commentId);
  }

  @ApiOperation({ summary: 'Edit a comment' })
  @ApiOkResponse({
    description: 'Edited Comment',
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
  @Put(':commentId/edit-comment')
  public async editComment(
    @Req() req: AuthorizedRequest,
    @Param('commentId') commentId: string,
    @Body() input: EditCommentDto,
  ) {
    await this.commentService.editComment(req.user.id, commentId, input);
  }
}
