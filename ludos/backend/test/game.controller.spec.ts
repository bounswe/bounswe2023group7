import { ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
import { GameController } from '../src/controllers/game.controller';
import { GameRepository } from '../src/repositories/game.repository';
import { GameService } from '../src/services/game.service';
import { Game } from '../src/entities/game.entity';
describe('GameController', () => {
  let gameController: GameController;
  let gameRepository: GameRepository;
  let userRepository: UserRepository;
  const dataSource = {
    createEntityManager: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      controllers: [GameController],
      providers: [
        GameService,
        GameRepository,
        UserRepository,
        {
          provide: DataSource,
          useValue: dataSource,
        },
      ],
    }).compile();

    gameController = app.get<GameController>(GameController);
    gameRepository = app.get<GameRepository>(GameRepository);
    userRepository = app.get<UserRepository>(UserRepository);

  });

  describe('follow', () => {
    it('should return 200', async () => {
      const game = new Game();
      game.followerList = [];
      game.id = "1";
      const user = new User();
      user.id = "1";
      const req = {
        user: user
      }; 
      const gameSpy = jest
        .spyOn(gameRepository, 'findGameByIdWithFollowerList')
        .mockResolvedValue(game);
      const userSpy = jest
        .spyOn(userRepository, 'findUserById')
        .mockResolvedValue(user);
      const updateSpy = jest
        .spyOn(gameRepository, 'updateGame')
        .mockResolvedValue(undefined);
      const response = await gameController.followGame(req as any, game.id);
      game.followerList.push(user);
      expect(gameSpy).toHaveBeenCalledWith(game.id);
      expect(userSpy).toHaveBeenCalledWith(user.id);
      expect(updateSpy).toHaveBeenCalledWith(game);

      expect(response).toBe(200);
    });
    it('should throw Conflict Exception', async () => {
      const game = new Game();
      game.followerList = [];
      game.id = "1";
      const user = new User();
      user.id = "1";
      const req = {
        user: user
      }; 
      game.followerList.push(user);
      const gameSpy = jest
        .spyOn(gameRepository, 'findGameByIdWithFollowerList')
        .mockResolvedValue(game);
      await expect(gameController.followGame(req as any, game.id)).rejects.toStrictEqual(
        new ConflictException("The game is followed already!")
      );
      expect(gameSpy).toHaveBeenCalledWith(game.id);
    });
    it('should throw Not Found Exception', async () => {
      const game = new Game();
      game.followerList = [];
      game.id = "1";
      const user = new User();
      user.id = "1";
      const req = {
        user: user
      }; 
      game.followerList.push(user);
      const gameSpy = jest
        .spyOn(gameRepository, 'findGameByIdWithFollowerList')
        .mockResolvedValue(undefined);
      await expect(gameController.followGame(req as any, game.id)).rejects.toStrictEqual(
        new NotFoundException("Game Not Found!")
      );
      expect(gameSpy).toHaveBeenCalledWith(game.id);
    });
  });
  describe('unfollow', () => {
    it('should return 200', async () => {
      const game = new Game();
      game.followerList = [];
      game.id = "1";
      const user = new User();
      user.id = "1";
      const req = {
        user: user
      }; 
      game.followerList.push(user);
      const gameSpy = jest
        .spyOn(gameRepository, 'findGameByIdWithFollowerList')
        .mockResolvedValue(game);
      const updateSpy = jest
        .spyOn(gameRepository, 'updateGame')
        .mockResolvedValue(undefined);
      const response = await gameController.unfollowGame(req as any, game.id);
      expect(gameSpy).toHaveBeenCalledWith(game.id);
      expect(updateSpy).toHaveBeenCalledWith(game);

      expect(response).toBe(200);
    });
    it('should throw Conflict exception', async () => {
      const game = new Game();
      game.followerList = [];
      game.id = "1";
      const user = new User();
      user.id = "1";
      const req = {
        user: user
      }; 
      const gameSpy = jest
        .spyOn(gameRepository, 'findGameByIdWithFollowerList')
        .mockResolvedValue(game);
      await expect(gameController.unfollowGame(req as any, game.id)).rejects.toStrictEqual(
        new ConflictException("The Game is not followed!")
        );   
      expect(gameSpy).toHaveBeenCalledWith(game.id);

    });
    it('should throw Not Found Exception', async () => {
      const game = new Game();
      game.followerList = [];
      game.id = "1";
      const user = new User();
      user.id = "1";
      const req = {
        user: user
      }; 
      game.followerList.push(user);
      const gameSpy = jest
        .spyOn(gameRepository, 'findGameByIdWithFollowerList')
        .mockResolvedValue(undefined);
      await expect(gameController.unfollowGame(req as any, game.id)).rejects.toStrictEqual(
        new NotFoundException("Game Not Found!")
      );
      expect(gameSpy).toHaveBeenCalledWith(game.id);
    });
  });
});