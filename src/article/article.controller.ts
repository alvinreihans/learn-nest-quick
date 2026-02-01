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
import { FindOneParams } from './dto/find-one.params';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  findAll(): IArticle[] {
    return this.articleService.findAllArticle();
  }

  @Get('/:id')
  findOne(@Param() params: FindOneParams): IArticle {
    return this.articleService.findOneArticle(params.id);
  }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto): IArticle {
    return this.articleService.createArticle(createArticleDto);
  }

  @Put('/:id')
  edit(
    @Param() params: FindOneParams,
    @Body() updateArticleDto: UpdateArticleDto,
  ): IArticle {
    return this.articleService.updateArticleByParams(
      params.id,
      updateArticleDto,
    );
  }

  @Delete('/:id')
  delete(@Param() params: FindOneParams) {
    this.articleService.deleteArticleByParams(params.id);
    return { message: `Berhasil menghapus artikel ${params.id}` };
  }
}
