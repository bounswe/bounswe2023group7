import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { ResetPasswordController } from '../src/controllers/reset-password.controller';
import { ResetDto } from '../src/dtos/reset-password/request/reset.dto';
import { PasswordReset } from '../src/entities/reset-password.entity';
import { PasswordResetRepository } from '../src/repositories/reset-password.repository';
import { ResetPasswordService } from '../src/services/reset-password.service';
describe('ResetPasswordController', () => {
  let resetPasswordController: ResetPasswordController;
  let resetPasswordRepository: PasswordResetRepository;
  const dataSource = {
    createEntityManager: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secretOrPrivateKey: 'test-secret',
        }),
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      controllers: [ResetPasswordController],
      providers: [
        ResetPasswordService,
        PasswordResetRepository,
        {
          provide: DataSource,
          useValue: dataSource,
        },
      ],
    }).compile();

    resetPasswordController = app.get<ResetPasswordController>(ResetPasswordController);
    resetPasswordRepository = app.get<PasswordResetRepository>(PasswordResetRepository);
  });

  describe('reset', () => {
    it('should give username', async () => {
      const username = 'username';
      const email = 'hello@email.com';
      const passwordReset = new PasswordReset();
      passwordReset.username = username;
      passwordReset.email = email;
      const resetDto: ResetDto = {
        username: username,
        email: email,
        timestamp: new Date(),
      };
      const findOneBySpy = jest
        .spyOn(resetPasswordRepository, 'findOneBy')
        .mockResolvedValue(passwordReset);
      const usernamex = (await resetPasswordController.resetPassword(resetDto)).username;
      //expect(findOneBySpy).toHaveBeenCalledWith({
      //  username: loginDto.username,
      //});
      expect(usernamex).toBeDefined();
    });
  });
});
