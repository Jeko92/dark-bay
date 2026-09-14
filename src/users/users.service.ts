import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './entities/user.entity';
import { hashSecret } from '../common/utils/hash.utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existing = await this.findByUsername(createUserDto.username);
    if (existing) {
      throw new ConflictException(
        `Username "${createUserDto.username}" is already taken`,
      );
    }

    const user = this.usersRepository.create({
      username: createUserDto.username,
      passwordHash: hashSecret(createUserDto.password),
    });
    const saved = await this.usersRepository.save(user);
    return plainToInstance(UserResponseDto, saved, {
      excludeExtraneousValues: true,
    });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);

    if ((result.affected ?? 0) === 0) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
  }
}
