import {
  Column,
  Entity as EntityDecorator,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn
} from 'typeorm';
import { EntityType } from '../enums/entity-type.enum';
import { Game } from './game.entity';

@EntityDecorator('entities')
export class Entity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Game, (game) => game.ratingList, { cascade: true })
  @JoinColumn()
  game: Game;

  @Column({type: "enum", enum: EntityType})
  type: EntityType;

  @Column({type: "json", default: {}})
  content: object;

  @Column()
  name: string;
}
