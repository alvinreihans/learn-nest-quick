import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ArticleStatus } from '../interfaces/article.interface';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsEnum(ArticleStatus)
  status: ArticleStatus;
}
