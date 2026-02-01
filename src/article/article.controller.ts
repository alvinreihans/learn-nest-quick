import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import type { IArticle } from './interfaces/article.interface';
import { FindOneParams } from './dto/find-one.params';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  findAll(): IArticle[] {
    return this.articleService.findAllArticle();
  }

  @Get('/:id')
  findOne(@Param() params: FindOneParams): IArticle {
    return this.findOneOrFail(params.id);
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

  private findOneOrFail(id: string): IArticle {
    const article = this.articleService.findOneByParams(id);
    if (!article) {
      throw new NotFoundException();
    }

    return article;
  }
}
