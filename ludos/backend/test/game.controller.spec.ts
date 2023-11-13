import { ConflictException, NotFoundException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { GameController } from '../src/controllers/game.controller';
import { Game } from '../src/entities/game.entity';
import { User } from '../src/entities/user.entity';
import { GameRepository } from '../src/repositories/game.repository';
import { UserRepository } from '../src/repositories/user.repository';
import { GameService } from '../src/services/game.service';
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
      game.id = '1';
      const user = new User();
      user.id = '1';
      const req = {
        user: user,
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
      game.id = '1';
      const user = new User();
      user.id = '1';
      const req = {
        user: user,
      };
      game.followerList.push(user);
      const gameSpy = jest
        .spyOn(gameRepository, 'findGameByIdWithFollowerList')
        .mockResolvedValue(game);
      await expect(
        gameController.followGame(req as any, game.id),
      ).rejects.toStrictEqual(
        new ConflictException('The game is followed already!'),
      );
      expect(gameSpy).toHaveBeenCalledWith(game.id);
    });
    it('should throw Not Found Exception', async () => {
      const game = new Game();
      game.followerList = [];
      game.id = '1';
      const user = new User();
      user.id = '1';
      const req = {
        user: user,
      };
      game.followerList.push(user);
      const gameSpy = jest
        .spyOn(gameRepository, 'findGameByIdWithFollowerList')
        .mockResolvedValue(undefined);
      await expect(
        gameController.followGame(req as any, game.id),
      ).rejects.toStrictEqual(new NotFoundException('Game Not Found!'));
      expect(gameSpy).toHaveBeenCalledWith(game.id);
    });
  });
  describe('unfollow', () => {
    it('should return 200', async () => {
      const game = new Game();
      game.followerList = [];
      game.id = '1';
      const user = new User();
      user.id = '1';
      const req = {
        user: user,
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
      game.id = '1';
      const user = new User();
      user.id = '1';
      const req = {
        user: user,
      };
      const gameSpy = jest
        .spyOn(gameRepository, 'findGameByIdWithFollowerList')
        .mockResolvedValue(game);
      await expect(
        gameController.unfollowGame(req as any, game.id),
      ).rejects.toStrictEqual(
        new ConflictException('The Game is not followed!'),
      );
      expect(gameSpy).toHaveBeenCalledWith(game.id);
    });
    it('should throw Not Found Exception', async () => {
      const game = new Game();
      game.followerList = [];
      game.id = '1';
      const user = new User();
      user.id = '1';
      const req = {
        user: user,
      };
      game.followerList.push(user);
      const gameSpy = jest
        .spyOn(gameRepository, 'findGameByIdWithFollowerList')
        .mockResolvedValue(undefined);
      await expect(
        gameController.unfollowGame(req as any, game.id),
      ).rejects.toStrictEqual(new NotFoundException('Game Not Found!'));
      expect(gameSpy).toHaveBeenCalledWith(game.id);
    });
  });
  describe('list games', () => {
    it('should return list of games', async () => {
      const game = new Game();
      game.followerList = [];
      game.id = '1';
      const user = new User();
      user.id = '1';
      const listResponse = {
        items: [game],
        meta: {
          currentPage: 1,
          itemCount: 1,
          itemsPerPage: 1,
          totalItems: 1,
          totalPages: 1,
        },
      };
      const listSpy = jest
        .spyOn(gameRepository, 'findGames')
        .mockResolvedValue(listResponse);
      const response = await gameController.listGames();
      expect(response).toBe(listResponse);
      expect(listSpy).toHaveBeenCalledWith(
        1,
        10,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
    });
  });
});
