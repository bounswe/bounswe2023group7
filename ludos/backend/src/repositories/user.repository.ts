import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import {Repository, DataSource} from "typeorm";
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
}