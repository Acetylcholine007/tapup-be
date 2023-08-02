import { Roles } from '@common/decorators/roles.decorator';
import { PaginationInput } from '@common/dto/input/pagination.input';
import { Role } from '@enums/user.enum';
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

@ApiTags('User')
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

  @Roles(Role.ADMIN)
  @Post()
  createUser(@Body() createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @Roles(Role.ADMIN)
  @Patch('/:userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() updateUserInput: UpdateUserInput
  ) {
    return this.userService.updateUser(userId, updateUserInput);
  }

  @Roles(Role.ADMIN)
  @Delete('/:userId')
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
