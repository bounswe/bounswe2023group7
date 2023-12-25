import { Controller, Get, Param, Req, UseInterceptors } from '@nestjs/common';
import { SearchService } from '../services/search.service';
import { SearchResponseDto } from '../dtos/search/response/search.response.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthorizedRequest } from '../interfaces/common/authorized-request.interface';
import { SerializerInterceptor } from '../interceptors/customSerializer.interceptor';

@Controller('search')
@ApiTags('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiOkResponse({
    type: SearchResponseDto,
  })
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Search for users, games, groups and posts',
  })
  @UseInterceptors(new SerializerInterceptor(SearchResponseDto))
  @Get('/:searchKey')
  async search(
    @Req() req: AuthorizedRequest,
    @Param('searchKey') searchKey: string,
  ): Promise<SearchResponseDto> {
    return await this.searchService.search(
      searchKey,
      req.user ? req.user.id : undefined,
    );
  }
}
