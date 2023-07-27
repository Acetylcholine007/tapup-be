import { PaginationInput } from '@common/dto/input/pagination.input';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserInput } from '../dtos/input/create-user.input';
import { UpdateUserInput } from '../dtos/input/update-user.input';
import { UserService } from '../services/user.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(@Query() paginationQuery: PaginationInput) {
    return this.userService.getUsers(paginationQuery);
  }

  @Get('/:userId')
  getUser(@Param('userId') userId: string) {
    return this.userService.getUser(userId);
  }

  @Post()
  createUser(@Body() createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @Patch('/:userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() updateUserInput: UpdateUserInput
  ) {
    return this.userService.updateUser(userId, updateUserInput);
  }

  @Delete('/:userId')
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
