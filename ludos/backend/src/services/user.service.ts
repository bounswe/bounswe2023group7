import { RegisterDto } from "../dtos/user/request/register.dto";
import { UserRepository } from "../repositories/user.repository";
import { RegisterResponseDto } from "../dtos/user/response/register-response.dto";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async register(input: RegisterDto): Promise<RegisterResponseDto> {
    try {
      const user = await this.userRepository.createUser(input);
      const userResponseDto: RegisterResponseDto = {
        id: user.id,
        email: user.email,
        username: user.username
      };
      return userResponseDto;
    } catch(e) {
      if (e.code == "23505") {
        throw new ConflictException(e.detail);
      }
      throw new InternalServerErrorException();
    }
  }
}