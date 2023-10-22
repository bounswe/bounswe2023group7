import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { RegisterDto } from "../dtos/user/request/register.dto";
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  public async register(@Body() input: RegisterDto) {
    return await this.userService.register(input);
  }
}