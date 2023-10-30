import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  VirtualColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  title: string;

  @Column({ type: 'text' })
  coverLink: string;

  @Column({ type: 'float', default: 0 })
  averageRating: number;

  @Column({ type: 'float', default: 0 })
  userRating: number;

  @Column('jsonb')
  systemRequirements: {
    minimum: {
      [key: string]: string | boolean;
    };

    recommended: {
      [key: string]: string | boolean;
    };
  };

  @Column({ type: 'float', default: 0 })
  userCompilationDuration: number;

  @Column({ type: 'float', default: 0 })
  averageUserCompilationDuration: number;

  @Column('text', { array: true })
  predecessors: string[];

  @Column('text', { array: true })
  successors: string[];

  @Column('text')
  gameGuide: string;

  @Column('text')
  gameStory: string;

  @Column('text', { array: true })
  platforms: string[];

  @Column({ type: 'varchar', length: 50 })
  ageRestriction: string;

  @Column('text', { array: true, default: '{}' })
  characters: string[];

  @Column('text', { array: true, default: '{}' })
  areas: string[];

  @Column('text', { array: true, default: '{}' })
  packages: string[];

  @Column('text', { array: true, default: '{}' })
  items: string[];

  @Column('text')
  gameBio: string;

  @Column('text', { array: true, default: '{}' })
  groups: string[];

  @Column('text', { array: true })
  tags: string[];

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column({ type: 'varchar', length: 255 })
  developer: string;

  @Column({ type: 'varchar', length: 255 })
  publisher: string;

  @Column('text')
  trivia: string;

  @Column('text', { array: true, default: '{}' })
  reviews: string[];

  @ManyToMany(() => User, (user) => user.followedGames)
  @JoinTable({ name: 'game_user_follows' })
  followerList: User[];

  @VirtualColumn({
    query: (alias) =>
      `SELECT COUNT(*) as count FROM game_user_follows WHERE "gamesId" = ${alias}.id`,
  })
  followers: number;

  isFollowed: boolean;
}
