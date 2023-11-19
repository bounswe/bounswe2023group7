import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { UserController } from '../src/controllers/user.controller';
import { LoginDto } from '../src/dtos/user/request/login.dto';
import { RegisterDto } from '../src/dtos/user/request/register.dto';
import { RegisterResponseDto } from '../src/dtos/user/response/register-response.dto';
import { User } from '../src/entities/user.entity';
import { UserRepository } from '../src/repositories/user.repository';
import { UserService } from '../src/services/user.service';
import { S3Service } from '../src/services/s3.service';
import { ResetPassword } from '../src/entities/reset-password.entity';
import { ResetDto } from '../src/dtos/user/request/reset.dto';
import { ResetPasswordRepository } from '../src/repositories/reset-password.repository';
import { CommentRepository } from '../src/repositories/comment.repository';

describe('UserController', () => {
  let userController: UserController;
  let userRepository: UserRepository;
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
      controllers: [UserController],
      providers: [
        UserService,
        S3Service,
        UserRepository,
        ResetPasswordRepository,
        CommentRepository,
        {
          provide: DataSource,
          useValue: dataSource,
        },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
    userRepository = app.get<UserRepository>(UserRepository);
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const username = 'username';
      const password = 'password';
      const user = new User();
      user.username = username;
      user.password = await user.getEncryptedPassword(password);
      const loginDto: LoginDto = {
        username: username,
        password: password,
      };
      const findOneBySpy = jest
        .spyOn(userRepository, 'findOneBy')
        .mockResolvedValue(user);
      const accessToken = (await userController.login(loginDto)).accessToken;
      expect(findOneBySpy).toHaveBeenCalledWith({
        username: loginDto.username,
      });
      expect(accessToken).toBeDefined();
    });
    it('should throw Unauthorized error because of wrong username', async () => {
      const loginDto: LoginDto = {
        username: 'Not_exist',
        password: 'password',
      };
      const findOneBySpy = jest
        .spyOn(userRepository, 'findOneBy')
        .mockResolvedValue(undefined);
      await expect(userController.login(loginDto)).rejects.toStrictEqual(
        new UnauthorizedException('Invalid Credentials!'),
      );
      expect(findOneBySpy).toHaveBeenCalledWith({
        username: loginDto.username,
      });
    });
    it('should throw Unauthorized error because of wrong password', async () => {
      const username = 'username';
      const password = 'password';
      const user = new User();
      user.username = username;
      user.password = await user.getEncryptedPassword(password);
      const loginDto: LoginDto = {
        username: username,
        password: 'wrong_password',
      };
      const findOneBySpy = jest
        .spyOn(userRepository, 'findOneBy')
        .mockResolvedValue(user);
      await expect(userController.login(loginDto)).rejects.toEqual(
        new UnauthorizedException('Invalid Credentials!'),
      );
      expect(findOneBySpy).toHaveBeenCalledWith({
        username: loginDto.username,
      });
    });
  });
  describe('register', () => {
    it('should return created user', async () => {
      const username = 'username';
      const email = 'test@email.com';
      const password = 'password';
      const id = '1';
      const user = new User();
      user.username = username;
      user.password = await user.getEncryptedPassword(password);
      user.email = email;
      user.id = id;
      const registerDto: RegisterDto = {
        username: username,
        password: password,
        email: email,
      };
      const registerResponseDto: RegisterResponseDto = {
        username,
        email,
        id,
      };
      const createUserSpy = jest
        .spyOn(userRepository, 'createUser')
        .mockResolvedValue(user);
      const createdUser = await userController.register(registerDto);
      expect(createUserSpy).toHaveBeenCalledWith(registerDto);
      expect(createdUser).toStrictEqual(registerResponseDto);
    });
    it('should throw Conflict error', async () => {
      const username = 'username';
      const email = 'test@email.com';
      const password = 'password';
      const registerDto: RegisterDto = {
        username: username,
        password: password,
        email: email,
      };
      const message = `Key (username)=(${username}) already exists.`;
      const createUserSpy = jest
        .spyOn(userRepository, 'createUser')
        .mockImplementation(() => {
          throw new Object({
            code: '23505',
            detail: message,
          });
        });
      await expect(userController.register(registerDto)).rejects.toStrictEqual(
        new ConflictException(message),
      );
      expect(createUserSpy).toHaveBeenCalledWith(registerDto);
    });
  });
  describe('reset-password', () => {
    xit('should send an email', async () => {
      const email = 'test@email.com';
      const code = '984854';
      const id = '1';
      const resetPassword = new ResetPassword();
      resetPassword.id = id;
      resetPassword.email = email;
      resetPassword.code = code;
      const resetDto: ResetDto = {
        email: email,
      };
      userController.resetPassword(resetDto);
      /*
      const createUserSpy = jest
        .spyOn(userRepository, 'createUser')
        .mockResolvedValue(user);
      const createdUser = await userController.register(registerDto);
      expect(createUserSpy).toHaveBeenCalledWith(registerDto);
      expect(createdUser).toStrictEqual(registerResponseDto);
      */
    });
  });
});
