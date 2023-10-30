import { Injectable } from '@nestjs/common';
import { ResetPassword } from '../entities/reset-password.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class ResetPasswordRepository extends Repository<ResetPassword> {
  constructor(dataSource: DataSource) {
    super(ResetPassword, dataSource.createEntityManager());
  }

  public async createPasswordReset(input: Partial<ResetPassword>, code: string, timestamp: Date): Promise<ResetPassword> {
    let resetPassword = this.create(input);
    resetPassword.code = code;
    resetPassword.timestamp = timestamp;
    await this.insert(resetPassword);
    return resetPassword;
  }

  public async deletePasswordReset(input: Partial<ResetPassword>) {
    let resetPassword = await this.findResetPasswordByEmail(input.email);
    await this.delete(resetPassword);
  }

  public findResetPasswordByEmail(email: string): Promise<ResetPassword> {
    return this.findOneBy({ email });
  }
}
