import { Injectable, NotFoundException } from '@nestjs/common';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { PostCreateDto } from '../dtos/post/request/create.dto';
import { PostUpdateDto } from '../dtos/post/request/update.dto';
import { PostCreateResponseDto } from '../dtos/post/response/create.response.dto';
import { Post } from '../entities/post.entity';
import { PostRepository } from '../repositories/post.repository';
import { UserRepository } from '../repositories/user.repository';
import { GameRepository } from '../repositories/game.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
    private readonly gameRepository: GameRepository,
  ) {}

  public async createPost(
    userId: string,
    input: PostCreateDto,
  ): Promise<PostCreateResponseDto> {
    const { gameId, ...partialPost } = input;
    const user = await this.userRepository.findUserById(userId);
    const game = await this.gameRepository.findGameById(gameId);
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    const post = await this.postRepository.createPost({
      user,
      game,
      ...partialPost,
    });
    return post;
  }
  public async updatePost(
    id: string,
    input: PostUpdateDto,
    userId: string,
  ): Promise<void> {
    const { gameId, ...partialPost } = input;
    const game = await this.gameRepository.findGameById(gameId);
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    const updateResult = await this.postRepository.updatePostByIdAndUserId(
      id,
      userId,
      {
        game,
        ...partialPost,
      },
    );
    if (updateResult.affected == 0) {
      throw new NotFoundException('Post not found or Forbidden');
    }
    return;
  }
  public async deletePost(id: string, userId: string): Promise<void> {
    const deleteResult = await this.postRepository.deletePostByIdAndUserId(
      id,
      userId,
    );
    if (deleteResult.affected == 0) {
      throw new NotFoundException('Post not found or Forbidden');
    }
    return;
  }

  public async getPost(id: string, userId?: string): Promise<Post> {
    const post = await this.postRepository.findPostById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    post.dislikedUsers = post.dislikedUsers.filter((user) => user.id != null);
    post.likedUsers = post.likedUsers.filter((user) => user.id != null);
    post.isLiked = userId
      ? post.likedUsers.some((user) => user.id === userId)
      : false;
    post.isDisliked = userId
      ? post.dislikedUsers.some((user) => user.id === userId)
      : false;
    return post;
  }
  async likePost(userId: string, postId: string): Promise<void> {
    const post = await this.postRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException('Post Not Found!');
    }
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User Not Found!');
    }
    if (post.likedUsers.some((user) => user.id === userId)) {
      post.likedUsers = post.likedUsers.filter((user) => user.id !== userId);
    } else if (post.dislikedUsers.some((user) => user.id === userId)) {
      post.dislikedUsers = post.dislikedUsers.filter(
        (user) => user.id !== userId,
      );
      post.likedUsers.push(user);
    } else {
      post.likedUsers.push(user);
    }

    await this.postRepository.updatePost(post);
  }

  async dislikePost(userId: string, postId: string): Promise<void> {
    const post = await this.postRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException('Post Not Found!');
    }
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User Not Found!');
    }
    if (post.dislikedUsers.some((user) => user.id === userId)) {
      post.dislikedUsers = post.dislikedUsers.filter(
        (user) => user.id !== userId,
      );
    } else if (post.likedUsers.some((user) => user.id === userId)) {
      post.likedUsers = post.likedUsers.filter((user) => user.id !== userId);
      post.dislikedUsers.push(user);
    } else {
      post.dislikedUsers.push(user);
    }

    await this.postRepository.updatePost(post);
  }

  async listPosts(
    page: number,
    limit: number,
    searchKey?: string,
    tags?: string,
    gameId?: string,
    ownerUserId?: string,
    userId?: string,
    isLiked?: boolean,
    isDisliked?: boolean,
    orderByKey?: keyof Post,
    order?: 'ASC' | 'DESC',
  ): Promise<Pagination<Post, IPaginationMeta>> {
    const tagList = tags ? tags.split(',') : undefined;
    const posts = await this.postRepository.findPosts(
      page,
      limit,
      searchKey,
      tagList,
      gameId,
      ownerUserId,
      userId,
      isLiked,
      isDisliked,
      orderByKey,
      order,
    );
    return posts;
  }
}
