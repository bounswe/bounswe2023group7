import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { GameRepository } from '../repositories/game.repository';
import { PostRepository } from '../repositories/post.repository';
import { SearchResponseDto } from '../dtos/search/response/search.response.dto';

@Injectable()
export class SearchService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly gameRepository: GameRepository,
    private readonly postRepository: PostRepository,
  ) {}
  public async search(
    searchKey: string,
    userId?: string,
  ): Promise<SearchResponseDto> {
    const users = await this.userRepository.findUsers(1, 100, searchKey);
    const games = await this.gameRepository.findGames(
      1,
      100,
      searchKey,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      userId,
    );
    const posts = await this.postRepository.findPosts(
      1,
      100,
      searchKey,
      undefined,
      undefined,
      undefined,
      userId,
    );
    return {
      users: users.items,
      games: games.items,
      posts: posts.items,
    };
  }
}
