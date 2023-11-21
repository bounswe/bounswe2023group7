import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { Game } from './game.entity';
import { User } from './user.entity';

@Entity('ratings')
@Unique(['game', 'user'])
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  rating: number;

  @ManyToOne(() => Game, (game) => game.ratingList, { cascade: true })
  game: Game;

  @ManyToOne(() => User, (user) => user.ratingList, { cascade: true })
  user: User;

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
}
