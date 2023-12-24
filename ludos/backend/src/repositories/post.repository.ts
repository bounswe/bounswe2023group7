import { Injectable } from '@nestjs/common';
import { DataSource, Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Post } from '../entities/post.entity';
import { IPaginationMeta, Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  public async createPost(input: Partial<Post>): Promise<Post> {
    const post = this.create(input);
    await this.insert(post);
    return post;
  }

  public async updatePost(input: Partial<Post>): Promise<void> {
    const post = this.create(input);
    await this.save(post);
  }
  public async deletePostByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<DeleteResult> {
    return await this.delete({ id, user: { id: userId } });
  }
  public async updatePostByIdAndUserId(
    id: string,
    userId: string,
    input: Partial<Post>,
  ): Promise<UpdateResult> {
    const post = this.create(input);
    return await this.update(
      {
        id: id,
        user: {
          id: userId,
        },
      },
      post,
    );
  }

  public findPostById(id: string): Promise<Post> {
    return this.findOne({
      where: { id },
      relations: this.getAllRelationsAsList(),
    });
  }

  public async findPosts(
    page: number,
    limit: number,
    searchKey?: string,
    tags?: string[],
    gameId?: string,
    groupId?: string,
    ownerUserId?: string,
    userId?: string, // denotes current user, used for like and dislike
    isLiked?: boolean,
    isDisliked?: boolean,
    isUpcomingTitle?: boolean,
    orderByKey: keyof Post = 'createdAt',
    order: 'ASC' | 'DESC' = 'DESC',
  ): Promise<Pagination<Post, IPaginationMeta>> {
    const queryBuilder = this.createQueryBuilder('posts')
      .leftJoinAndSelect('posts.user', 'user')
      .leftJoinAndSelect('posts.game', 'game')
      .leftJoinAndSelect('posts.group', 'group')
      .where('1=1');
    if (searchKey) {
      searchKey = searchKey.trim().replace(/ /g, ' & ');
      queryBuilder.andWhere(
        `to_tsvector(\'english\', posts.title || \' \' || posts.body) @@ to_tsquery('${searchKey}')`,
      );
    }
    if (tags) {
      queryBuilder.andWhere('posts.tags @> :tags', { tags });
    }
    if (gameId) {
      queryBuilder.andWhere('posts.gameId = :gameId', { gameId });
    }
    if (groupId) {
      queryBuilder.andWhere('posts.groupId = :groupId', { groupId });
    } else {
      queryBuilder.andWhere('posts.groupId IS NULL');
    }
    if (ownerUserId) {
      queryBuilder.andWhere('posts.userId = :ownerUserId', { ownerUserId });
    }
    if (isUpcomingTitle) {
      console.log("seeeennnn");
      queryBuilder.andWhere('posts."upcomingTitle"->>\'isUpcomingTitle\' = :isUpcomingTitle', {
        isUpcomingTitle: isUpcomingTitle.toString(),
      });
    }
    if (userId && isLiked) {
      const subQuery = this.createQueryBuilder()
        .select('1')
        .from('post_user_likes', 'pul')
        .where(`pul.usersId = '${userId}'`)
        .andWhere('pul.postsId = posts.id')
        .getQuery();
      queryBuilder.andWhere(`EXISTS (${subQuery})`);
    }
    if (userId && isDisliked && !isLiked) {
      const subQuery = this.createQueryBuilder()
        .select('1')
        .from('post_user_dislikes', 'pud')
        .where(`pud.usersId = '${userId}'`)
        .andWhere('pud.postsId = posts.id')
        .getQuery();
      queryBuilder.andWhere(`EXISTS (${subQuery})`);
    }
    if (orderByKey) {
      queryBuilder.orderBy(`"posts_${orderByKey}"`, order);
    }
    const posts = await paginate<Post>(queryBuilder, { page, limit });
    if (userId) {
      await Promise.all(
        posts.items.map(async (post) => {
          post.isLiked = await this.checkIfPostIsLiked(post.id, userId);
        }),
      );
      await Promise.all(
        posts.items.map(async (post) => {
          post.isDisliked = await this.checkIfPostIsDisliked(post.id, userId);
        }),
      );
    }
    return posts;
  }
  private async checkIfPostIsLiked(
    postId: string,
    userId: string,
  ): Promise<boolean> {
    const result = await this.createQueryBuilder()
      .select('1')
      .from('post_user_likes', 'pul')
      .where(`pul.usersId = '${userId}'`)
      .andWhere('pul.postsId = :postId', { postId })
      .getExists();
    return result ? true : false;
  }
  private async checkIfPostIsDisliked(
    postId: string,
    userId: string,
  ): Promise<boolean> {
    const result = await this.createQueryBuilder()
      .select('1')
      .from('post_user_dislikes', 'pud')
      .where(`pud.usersId = '${userId}'`)
      .andWhere('pud.postsId = :postId', { postId })
      .getExists();
    return result ? true : false;
  }

  public getAllRelationsAsList() {
    return this.metadata.relations.map((relation) => relation.propertyName);
  }
}
