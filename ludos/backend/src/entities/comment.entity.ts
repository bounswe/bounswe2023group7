import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { User } from '../entities/user.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { eager: true })
  author: User;

  @Column()
  timestamp: Date;

  @Column()
  parentId: string;

  @Column()
  text: string;

  @ManyToMany('User', { eager: true })
  @JoinTable({ name: 'comment_user_likes' })
  likedUsers: User[];

  @ManyToMany('User', { eager: true })
  @JoinTable({ name: 'comment_user_dislikes' })
  dislikedUsers: User[];

  @Column({ default: false })
  edited: boolean;
}
