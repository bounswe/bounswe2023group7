import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  VirtualColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { lazy: false })
  user: User;

  @Column({ nullable: true })
  title: string;

  @Column()
  body: string;

  @Column('text', { array: true, default: [] })
  media: string[];

  @ManyToMany('User', 'likedPosts')
  @JoinTable({ name: 'post_user_likes' })
  likedUsers: User[];

  @VirtualColumn({
    query: (post) =>
      `SELECT COUNT(*) FROM post_user_likes WHERE "postsId" = ${post}.id`,
  })
  numberOfLikes: number;

  @ManyToMany('User', 'dislikedPosts')
  @JoinTable({ name: 'post_user_dislikes' })
  dislikedUsers: User[];

  @VirtualColumn({
    query: (post) =>
      `SELECT COUNT(*) FROM post_user_dislikes WHERE "postsId" = ${post}.id`,
  })
  numberOfDislikes: number;

  // @OneToMany(() => Comment)
  // comments: Comment[];

  // @VirtualColumn({
  //   query: (post) => `SELECT COUNT(*) FROM comments WHERE parentId = ${post}.id`
  // })
  // numberOfComments: number;

  @Column('text', { array: true, default: [] })
  tags: string[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  isLiked: boolean;

  isDisliked: boolean;
}
