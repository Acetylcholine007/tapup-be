import { PaginationInput } from '@common/dto/input/pagination.input';
import { UserEntity } from '@entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../dtos/input/create-user.input';
import { UpdateUserInput } from '../dtos/input/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getUsers(paginationQuery: PaginationInput) {
    const { offset, limit } = paginationQuery;
    return this.userRepository.find({
      skip: offset,
      take: limit,
      relations: { businessCards: true },
    });
  }

  async getUser(query: string, target: keyof UserEntity = 'id') {
    const user = await this.userRepository.findOne({
      where: { [target]: query },
      relations: { businessCards: true },
    });
    if (!user)
      throw new NotFoundException(`User with ${target} of ${query} not found`);
    return user;
  }

  async createUser(createUserInput: CreateUserInput) {
    const user = this.userRepository.create(createUserInput);
    return this.userRepository.save(user);
  }

  async updateUser(userId: string, updateUserInput: UpdateUserInput) {
    const user = await this.getUser(userId);

    Object.assign(user, updateUserInput);
    return this.userRepository.save(user);
  }

  async verifyUser(user: UserEntity) {
    user.isVerified = true;
    return this.userRepository.save(user);
  }

  async updateUserPassword(user: UserEntity, newPassword: string) {
    user.password = newPassword;
    return this.userRepository.save(user);
  }

  async deleteUser(id: string) {
    const user = await this.getUser(id);
    return this.userRepository.remove(user);
  }
}
