import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  Index,
  ManyToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Game } from './game.entity';
import { UserType } from '../enums/user-type.enum';
import { Review } from './review.entity';
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

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

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
