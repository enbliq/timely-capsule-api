import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  public async findAllUsers(page: number, limit: number) {
    const [users, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });
    console.log(limit, page);
    return {
      total,
      data: users,
    };
  }

  // Finding a Single User By Registered ID
  public findOneById(id: number): Promise<User> {
    try {
      const user = this.userRepository.findOneBy({ id });
      return user;
    } catch (error) {
      throw new NotFoundException({ description: error }, 'User Not Found');
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  // Deleting a User By Registered ID
  public deleteUser(id: number) {
    const user = this.userRepository.findOneBy({ id });

    if (user) {
      return this.userRepository.softDelete(id);
    } else {
      throw new NotFoundException('User Not Found');
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`)
    }
    return user
  }
}
