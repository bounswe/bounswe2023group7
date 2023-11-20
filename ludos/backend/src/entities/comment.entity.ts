import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
//import { User } from '../entities/user.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  author: string; //User;

  @Column()
  timestamp: Date;

  @Column()
  parentId: string;

  @Column()
  text: string;

  @Column()
  likes: number;

  @Column()
  dislikes: number;
}
