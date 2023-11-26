import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { IPaginationMeta, Pagination, paginate } from 'nestjs-typeorm-paginate';

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

  public findUserById(id: string): Promise<User> {
    return this.findOneBy({ id });
  }

  public async updateUserPassword(input: Partial<User>, newPassword: string) {
    const user = await this.findUserByUsername(input.username);
    user.password = newPassword;
    await this.save(user);
  }

  public async findUserByIdWithRelations(id: string): Promise<User> {
    const user = await this.findOne({
      relations: this.getAllRelationsAsList(),
      where: { id: id },
    });
    return user;
  }

  public getAllRelationsAsList() {
    return this.metadata.relations.map((relation) => relation.propertyName);
  }

  public async findUsers(
    page: number,
    limit: number,
    searchKey?: string,
    orderByKey: keyof User = 'id',
    order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<Pagination<User, IPaginationMeta>> {
    const queryBuilder = this.createQueryBuilder('users').where('1=1');
    if (searchKey) {
      searchKey = searchKey.trim().replace(/ /g, ':* & ');
      searchKey += ':*';
      queryBuilder.andWhere(
        `(to_tsvector(\'english\', users.username) @@ to_tsquery('${searchKey}') OR to_tsvector(\'english\', users.fullName) @@ to_tsquery('${searchKey}'))`,
      );
    }
    if (orderByKey) {
      queryBuilder.orderBy(`users_${orderByKey}`, order);
    }
    const paginationResult = await paginate<User>(queryBuilder, {
      page,
      limit,
    });
    return paginationResult;
  }
}
