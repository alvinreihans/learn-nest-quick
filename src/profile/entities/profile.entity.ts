import { User } from 'src/auth/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  age: number;

  @Column({
    type: 'text',
  })
  bio: string;

  @Column({
    type: 'uuid',
  })
  userId: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
