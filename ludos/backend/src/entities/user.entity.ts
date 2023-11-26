import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  Index,
  ManyToMany,
  VirtualColumn
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Game } from './game.entity';
import { UserType } from '../enums/user-type.enum';
import { Review } from './review.entity';
import { Post } from './post.entity';
import { Rating } from './rating.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Index()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Game, (game) => game.followerList)
  followedGames: Game[];

  // @VirtualColumn({
  //   query: (alias) => `SELECT COUNT(*) FROM game_user_follows WHERE "usersId" = ${alias}.id `,
  // })
  // numberOfFollowedGames: number;


  @Column({ default: false })
  isNotificationEnabled: boolean;

  @Column({ enum: UserType, type: 'enum', default: UserType.GAMER })
  userType: UserType;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  aboutMe: string;

  @Column({ nullable: true })
  steamUrl: string;

  @OneToMany('Review', 'user')
  reviews: Review[];

  // @VirtualColumn({
  //   query: (alias) => `SELECT COUNT(*) FROM reviews WHERE "userId" = ${alias}.id `,
  // })
  // numberOfReviews: number;

  @OneToMany('Post', 'user')
  posts: Post[];

  // @VirtualColumn({
  //   query: (alias) => `SELECT COUNT(*) FROM posts WHERE "userId" = ${alias}.id `,
  // })
  // numberOfPosts: number;


  // @VirtualColumn({
  //   query: (alias) => `SELECT COUNT(*) FROM comments WHERE "authorId" = ${alias}.id `,
  // })
  // numberOfComments: number;

  @OneToMany('Rating', 'user')
  ratingList: Rating[];

  // @VirtualColumn({
  //   query: (alias) => `SELECT COUNT(*) FROM ratings WHERE "userId" = ${alias}.id `,
  // })
  // numberOfRatings: number;

  @ManyToMany('Review', 'likedUsers')
  likedReviews: Review[];

  @ManyToMany('Review', 'dislikedUsers')
  dislikedReviews: Review[];

  @ManyToMany('Post', 'likedUsers')
  likedPosts: Post[];

  @ManyToMany('Post', 'dislikedUsers')
  dislikedPosts: Post[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPasswordBeforeInsertAndUpdate() {
    if (this.password) {
      this.password = await this.getEncryptedPassword(this.password);
    }
  }

  async getEncryptedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compareEncryptedPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
