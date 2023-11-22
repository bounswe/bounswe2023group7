import {
    Body,
    Controller,
    HttpCode,
    Delete,
    Param,
    Post,
    Put,
    Get,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConflictResponse,
    ApiOkResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiTags,
  } from '@nestjs/swagger';
  import { ReviewCreateDto } from '../dtos/review/request/create.dto';
  import { Review } from '../entities/review.entity';
  import { AuthGuard } from '../services/guards/auth.guard';
  import { AuthorizedRequest } from '../interfaces/common/authorized-request.interface';
  import { ReviewService } from '../services/review.service';
  import { ReviewEditDto } from '../dtos/review/request/edit.dto';
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiTags('review')
  @Controller('review')
  export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}
  
    @ApiCreatedResponse({
      description: 'Review created successfully',
      type: Review,
    })
    @ApiConflictResponse({
      description: 'Conflict in creating the review',
    })
    @ApiBadRequestResponse({
      description: 'Bad Request',
    })
    @HttpCode(201)
    @Post(':gameId')
    public async createReview(
      @Req() req: AuthorizedRequest,
      @Param('gameId') gameId: string,
      @Body() reviewCreateDto: ReviewCreateDto,
    ) {
      const createdReview = await this.reviewService.createReview(
        req.user.id,
        gameId,
        reviewCreateDto,
      );
      return createdReview;
    }

    @HttpCode(200)
    @Post(':reviewId/like')
    public async likeReview(
      @Req() req: AuthorizedRequest,
      @Param('reviewId') reviewId: string,
    ) {
      await this.reviewService.likeReview(req.user.id, reviewId);
      return { message: 'Review liked successfully.' };
    }

    @HttpCode(200)
    @Post(':reviewId/dislike')
    public async dislikeReview(
      @Req() req: AuthorizedRequest,
      @Param('reviewId') reviewId: string,
    ) {
      await this.reviewService.dislikeReview(req.user.id, reviewId);
      return { message: 'Review disliked successfully.' };
    }

    @ApiNotFoundResponse({ description: 'Review is not found!' })
    @HttpCode(204)
    @Delete(':reviewId')
    public async deleteReview(
      @Req() req: AuthorizedRequest,
      @Param('reviewId') reviewId: string,
    ) {
      await this.reviewService.deleteReview(req.user.id, reviewId);
      return { message: 'Review deleted successfully.'};
    }

  @HttpCode(200)
  @Put(':reviewId')
  public async editReview(
    @Req() req: AuthorizedRequest,
    @Param('reviewId') reviewId: string,
    @Body() reviewEditDto: ReviewEditDto,
  ) {
    const editedReview = await this.reviewService.editReview(
      req.user.id,
      reviewId,
      reviewEditDto,
    );
    return editedReview;
  }


  @ApiOkResponse({ description: 'Review retrieved successfully', type: Review })
  @ApiNotFoundResponse({ description: 'Review is not found!' })
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Get(':reviewId')
  public async getReviewById(
    @Req() req: AuthorizedRequest,
    @Param('reviewId') reviewId: string,
  ) {
    const review = await this.reviewService.getReviewById(reviewId);
    return review;
  }

  @ApiOkResponse({ description: 'Reviews retrieved successfully', type: [Review] })
  @ApiNotFoundResponse({ description: 'Game is not found!' })
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Get('game/:gameId')
  public async getReviewsByGameId(
    @Req() req: AuthorizedRequest,
    @Param('gameId') gameId: string,
  ) {
    const reviews = await this.reviewService.getReviewsByGameId(gameId);
    return reviews;
  }

  }
  