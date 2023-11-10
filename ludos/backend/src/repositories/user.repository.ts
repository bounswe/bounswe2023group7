import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Game } from '../entities/game.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async createUser(input: Partial<User>): Promise<User> {
    const user = this.create(input);
    await this.insert(user);
    return user;
  }

  public findUserByUsername(username: string): Promise<User> {
    return this.findOneBy({ username });
  }

  public findUserByEmail(email: string): Promise<User> {
    return this.findOneBy({ email: email });
  }

  public async updateUserPassword(input: Partial<User>, newPassword: string) {
    const user = await this.findUserByUsername(input.username);
    user.password = newPassword;
    await this.save(user);
  }
  public findUserById(id: string): Promise<User> {
    return this.findOneBy({ id });
  }

  public async getFollowedGamesByUserId(userId: string): Promise<Game[]> {
    const user = await this.createQueryBuilder('users')
      .leftJoinAndSelect('users.followedGames', 'followedGames')
      .where('users.id = :userId', { userId })
      .getOne();

    return user ? user.followedGames : [];
  }

}
