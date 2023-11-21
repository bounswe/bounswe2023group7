import {
  Body,
  Controller,
  HttpCode,
  Delete,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RatingCreateDto } from '../dtos/rating/request/create.dto';
import { Rating } from '../entities/rating.entity';
import { AuthGuard } from '../services/guards/auth.guard';
import { AuthorizedRequest } from '../interfaces/common/authorized-request.interface';
import { RatingService } from '../services/rating.service';
import { RatingEditDto } from '../dtos/rating/request/edit.dto';

@UseGuards(AuthGuard)
@ApiTags('rating')
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Rating created successfully.',
    type: Rating,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @HttpCode(201)
  @Post(':gameId')
  public async createRating(
    @Req() req: AuthorizedRequest,
    @Param('gameId') gameId: string,
    @Body() ratingCreateDto: RatingCreateDto,
  ) {
    const createdRating = await this.ratingService.createRating(
      req.user.id,
      gameId,
      ratingCreateDto,
    );
    return createdRating;
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiNotFoundResponse({ description: 'Rating is not found!' })
  @HttpCode(204)
  @Delete(':gameId')
  public async deleteRating(
    @Req() req: AuthorizedRequest,
    @Param('gameId') gameId: string,
  ) {
    const deletedRatingResponse = await this.ratingService.deleteRating(
      req.user.id,
      gameId,
    );
    return deletedRatingResponse;
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  @Put(':gameId')
  public async editRating(
    @Req() req: AuthorizedRequest,
    @Param('gameId') gameId: string,
    @Body() ratingEditDto: RatingEditDto,
  ) {
    const editedRating = await this.ratingService.editRating(
      req.user.id,
      gameId,
      ratingEditDto,
    );
    return editedRating;
  }
}
