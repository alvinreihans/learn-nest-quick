import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: { id: true, name: true, email: true },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async updateRoleUser(
    id: string,
    updateRoleDto: UpdateRoleDto,
  ): Promise<{ message: string }> {
    const user = await this.findOne(id);
    Object.assign(user, updateRoleDto);
    await this.userRepository.save(user);
    return {
      message: 'Update role user berhasil',
    };
  }
}
