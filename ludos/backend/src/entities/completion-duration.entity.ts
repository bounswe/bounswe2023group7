import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { User } from '../entities/user.entity';
import { Game } from './game.entity';

@Entity('completion_durations')
export class CompletionDuration {
  @PrimaryColumn()
  gameId: string;

  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => Game)
  @JoinColumn({ name: 'gameId' })
  game: Game;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('float')
  duration: number;
}
