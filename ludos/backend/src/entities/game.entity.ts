import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  VirtualColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Review } from './review.entity';
import { Rating } from './rating.entity';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  title: string;

  @Column({ type: 'text' })
  coverLink: string;

  @VirtualColumn({
    query: (alias) =>
      `SELECT AVG(rating) FROM ratings WHERE "gameId" = ${alias}.id`,
    type: 'float',
  })
  averageRating: number;

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

  userCompletionDuration: number;

  @VirtualColumn({
    query: (alias) =>
      `SELECT AVG(duration) FROM completion_durations WHERE "gameId" = ${alias}.id`,
    type: 'float',
  })
  averageCompletionDuration: number;

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

  @OneToMany('Review', 'game')
  reviews: Review[];

  @OneToMany('Rating', 'game')
  ratingList: Rating[];

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
