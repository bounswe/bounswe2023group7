import { Injectable } from '@nestjs/common';
import { PasswordReset } from '../entities/reset-password.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class PasswordResetRepository extends Repository<PasswordReset> {
  constructor(dataSource: DataSource) {
    super(PasswordReset, dataSource.createEntityManager());
  }

  public async createPasswordReset(input: Partial<PasswordReset>): Promise<PasswordReset> {
    const passwordReset = this.create(input);
    await this.insert(passwordReset);
    return passwordReset;
  }

  public async deletePasswordReset(input: Partial<PasswordReset>) {
    const passwordReset = this.create(input);
    await this.delete(passwordReset);
  }
}
