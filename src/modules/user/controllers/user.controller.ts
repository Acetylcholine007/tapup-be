import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Roles } from '@common/decorators/roles.decorator';
import { PaginationInput } from '@common/dto/input/pagination.input';
import { UserEntity } from '@entities/user.entity';
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

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @Get()
  getUsers(@Query() paginationQuery: PaginationInput) {
    return this.userService.getUsers(paginationQuery);
  }

  @Get('/me')
  getMyInfo(@CurrentUser() currentUser: UserEntity) {
    return this.userService.getUser(currentUser.id);
  }

  @Roles(Role.ADMIN)
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
