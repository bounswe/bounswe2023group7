import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiTags,
  } from '@nestjs/swagger';
  import { ReviewCreateDto } from '../dtos/review/request/create.dto';
  import { Review } from '../entities/review.entity';
  import { AuthGuard } from '../services/guards/auth.guard';
  import { AuthorizedRequest } from '../interfaces/common/authorized-request.interface';
  import { ReviewService } from '../services/review.service';
  
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

  }
  