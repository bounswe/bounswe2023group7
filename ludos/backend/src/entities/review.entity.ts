import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
    UpdateDateColumn,
  } from 'typeorm';
  import { Game } from './game.entity';
  import { User } from './user.entity';
  
  @Entity('reviews')
  export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column('text')
    content: string;
  
    @Column('float')
    rating: number;
  
    @ManyToOne(() => Game, (game) => game.reviews)
    game: Game;
  
    @ManyToOne(() => User, (user) => user.reviews)
    user: User;

    @ManyToMany(() => User, user => user.likedReviews)
    @JoinTable()
    likedUsers: User[]

    @ManyToMany(() => User, user => user.dislikedReviews)
    @JoinTable()
    dislikedUsers: User[];
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
  }
  