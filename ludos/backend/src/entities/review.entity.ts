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
  
    @ManyToOne(type => Game, game => game.reviews, { cascade: true })
    game: Game;
  
    @ManyToOne(type => User, user => user.reviews, { cascade: true })
    user: User;

    @ManyToMany('User', 'likedReviews')
    @JoinTable({ name: 'review_user_likes' })
    likedUsers: User[]

    @ManyToMany('User', 'dislikedReviews')
    @JoinTable({ name: 'review_user_dislikes' })
    dislikedUsers: User[];
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
  }
  