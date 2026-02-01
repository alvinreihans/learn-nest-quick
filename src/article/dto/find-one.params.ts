import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindOneParamas {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
