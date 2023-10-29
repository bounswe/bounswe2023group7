import { Injectable } from '@nestjs/common';
import { ResetPassword } from '../entities/reset-password.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class ResetPasswordRepository extends Repository<ResetPassword> {
  constructor(dataSource: DataSource) {
    super(ResetPassword, dataSource.createEntityManager());
  }

  public async createPasswordReset(input: Partial<ResetPassword>): Promise<ResetPassword> {
    const resetPassword = this.create(input);
    await this.insert(resetPassword);
    return resetPassword;
  }

  public async deletePasswordReset(input: Partial<ResetPassword>) {
    const resetPassword = this.create(input);
    await this.delete(resetPassword);
  }
}
