import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SearchResponseDto } from '../dtos/search/response/search.response.dto';
import {
  GameSemanticResponseDto,
  GroupSemanticResponseDto,
  PostSemanticResponseDto,
  SemanticSearchResponseDto,
  UserSemanticResponseDto,
} from '../dtos/search/response/semantic-search.response.dto';
import { SemanticResponse } from '../interfaces/semantic/response.interface';
import { GameRepository } from '../repositories/game.repository';
import { GroupRepository } from '../repositories/group.repository';
import { PostRepository } from '../repositories/post.repository';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class SearchService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly gameRepository: GameRepository,
    private readonly postRepository: PostRepository,
    private readonly groupRepository: GroupRepository,
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
    const groups = await this.groupRepository.findGroups(
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
      groups: groups.items,
    };
  }
  public async semanticSearch(
    searchKey: string,
    userId?: string,
  ): Promise<SemanticSearchResponseDto> {
    const users = await this.userRepository.findUsers(1, 1000);
    const games = await this.gameRepository.findGames(
      1,
      1000,
      undefined,
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
      1000,
      undefined,
      undefined,
      undefined,
      undefined,
      userId,
    );
    const groups = await this.groupRepository.findGroups(
      1,
      1000,
      undefined,
      undefined,
      undefined,
      undefined,
      userId,
    );
    let usersUsernameSemanticSearchResult: SemanticResponse[] = [];
    try {
      usersUsernameSemanticSearchResult = (
        await axios.post(`http://104.248.19.88:8000/search/${searchKey}`, {
          items: users.items.map((user) => {
            return {
              id: user.id,
              text: user.username,
            };
          }),
        })
      ).data;
    } catch (error) {
      usersUsernameSemanticSearchResult = [];
    }

    const items = [];
    users.items.forEach((user) => {
      if (user.fullName != null) {
        items.push({
          id: user.id,
          text: user.fullName,
        });
      }
    });
    let usersFullNameSemanticSearchResult: SemanticResponse[] = [];
    try {
      usersFullNameSemanticSearchResult = (
        await axios.post(`http://104.248.19.88:8000/search/${searchKey}`, {
          items: items,
        })
      ).data;
    } catch (error) {
      usersFullNameSemanticSearchResult = [];
    }
    let gamesTitleSemanticSearchResult: SemanticResponse[] = [];
    try {
      gamesTitleSemanticSearchResult = (
        await axios.post(`http://104.248.19.88:8000/search/${searchKey}`, {
          items: games.items.map((game) => {
            return {
              id: game.id,
              text: game.title,
            };
          }),
        })
      ).data;
    } catch (error) {
      gamesTitleSemanticSearchResult = [];
    }
    let postsTitleSemanticSearchResult: SemanticResponse[] = [];
    try {
      postsTitleSemanticSearchResult = (
        await axios.post(`http://104.248.19.88:8000/search/${searchKey}`, {
          items: posts.items.map((post) => {
            return {
              id: post.id,
              text: post.title,
            };
          }),
        })
      ).data;
    } catch (error) {
      postsTitleSemanticSearchResult = [];
    }
    let postsBodySemanticSearchResult: SemanticResponse[] = [];
    try {
      postsBodySemanticSearchResult = (
        await axios.post(`http://104.248.19.88:8000/search/${searchKey}`, {
          items: posts.items.map((post) => {
            return {
              id: post.id,
              text: post.body,
            };
          }),
        })
      ).data;
    } catch (error) {
      postsBodySemanticSearchResult = [];
    }
    let groupsNameSemanticSearchResult: SemanticResponse[] = [];
    try {
      groupsNameSemanticSearchResult = (
        await axios.post(`http://104.248.19.88:8000/search/${searchKey}`, {
          items: groups.items.map((group) => {
            return {
              id: group.id,
              text: group.name,
            };
          }),
        })
      ).data;
    } catch (error) {
      groupsNameSemanticSearchResult = [];
    }

    const groupsResponse: GroupSemanticResponseDto[] = [];
    groupsNameSemanticSearchResult.forEach((group: SemanticResponse) => {
      if (group.score > 0.3) {
        groupsResponse.push({
          item: groups.items.find((g) => g.id === group.id),
          score: group.score,
        });
      }
    });
    const gamesResponse: GameSemanticResponseDto[] = [];
    gamesTitleSemanticSearchResult.forEach((game: SemanticResponse) => {
      if (game.score > 0.3) {
        gamesResponse.push({
          item: games.items.find((g) => g.id === game.id),
          score: game.score,
        });
      }
    });
    const usersResponse: UserSemanticResponseDto[] = [];
    usersUsernameSemanticSearchResult.forEach((user: SemanticResponse) => {
      if (user.score > 0.3) {
        const sameUser = usersFullNameSemanticSearchResult.find(
          (u) => u.id === user.id,
        );
        if (sameUser) {
          if (sameUser.score > user.score) {
            usersResponse.push({
              item: users.items.find((u) => u.id === user.id),
              score: sameUser.score,
            });
            return;
          }
          usersFullNameSemanticSearchResult.splice(
            usersFullNameSemanticSearchResult.indexOf(sameUser),
            1,
          );
        }
        usersResponse.push({
          item: users.items.find((u) => u.id === user.id),
          score: user.score,
        });
      }
    });
    usersFullNameSemanticSearchResult.forEach((user: SemanticResponse) => {
      if (user.score > 0.3) {
        usersResponse.push({
          item: users.items.find((u) => u.id === user.id),
          score: user.score,
        });
      }
    });
    const postsResponse: PostSemanticResponseDto[] = [];
    postsTitleSemanticSearchResult.forEach((post: SemanticResponse) => {
      if (post.score > 0.3) {
        const samePost = postsBodySemanticSearchResult.find(
          (p) => p.id === post.id,
        );
        if (samePost) {
          if (samePost.score > post.score) {
            postsResponse.push({
              item: posts.items.find((p) => p.id === post.id),
              score: samePost.score,
            });
            return;
          }
          postsBodySemanticSearchResult.splice(
            postsBodySemanticSearchResult.indexOf(samePost),
            1,
          );
        }
        postsResponse.push({
          item: posts.items.find((p) => p.id === post.id),
          score: post.score,
        });
      }
    });
    postsBodySemanticSearchResult.forEach((post: SemanticResponse) => {
      if (post.score > 0.3) {
        postsResponse.push({
          item: posts.items.find((p) => p.id === post.id),
          score: post.score,
        });
      }
    });

    return {
      users: usersResponse,
      games: gamesResponse,
      posts: postsResponse,
      groups: groupsResponse,
    };
  }
}
