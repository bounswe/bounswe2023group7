import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  Column,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
import { Game } from './game.entity';
import { CreateDateColumn } from 'typeorm';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  admin: User;

  @ManyToOne(() => Game)
  game: Game;

  @ManyToMany('User', 'groups')
  @JoinTable()
  members: User[];

  @OneToMany(() => Post, (post) => post.group)
  posts: Post[];

  @Column()
  maxNumberOfMembers: number;

  @Column()
  description: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  logo: string;

  @Column('text', { array: true, default: [] })
  tags: string[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  isJoined: boolean;
}
