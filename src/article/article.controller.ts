import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import type { IArticle } from './interfaces/article.interface';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  findAll(): IArticle[] {
    return this.articleService.findAllArticle();
  }

  @Get('/:id')
  findOne(@Param('id') id: string): string {
    return `Tampilkan detail artikel ${id}`;
  }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto): IArticle {
    return this.articleService.createArticle(createArticleDto);
  }

  @Put('/:id')
  edit(@Param('id') id: string): string {
    return `Edit artikel ${id}`;
  }

  @Delete('/:id')
  delete(@Param('id') id: string): string {
    return `Hapus artikel ${id}`;
  }
}
