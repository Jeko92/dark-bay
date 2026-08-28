import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserResponseDto } from './dto/user-response.dto';
import { hashSecret } from '../common/utils/hashUtils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto):Promise<UserResponseDto> {
    const existing = await this.findByUsername(createUserDto.username);
    if(existing){
      throw new ConflictException(
        `Username "${createUserDto.username}" is already taken`,
      );
    }

    const user = this.usersRepository.create({
      username: createUserDto.username,
      passwordHash: hashSecret(createUserDto.password),
    });

    return await this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findByUsername(username: string):Promise<User | null> {
    return this.usersRepository.findOneBy({username});
  }

  findOne(id: string) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string) {
    const result = await this.usersRepository.delete(id);

    if ((result.affected ?? 0) === 0) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
  }
}
