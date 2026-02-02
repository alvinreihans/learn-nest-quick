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
import { FindOneParams } from './dto/find-one.params';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(): Promise<Article[]> {
    return await this.articleService.findAllArticle();
  }

  @Get('/:id')
  async findOne(@Param() params: FindOneParams): Promise<Article | null> {
    return await this.articleService.findOneArticle(params.id);
  }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articleService.createArticle(createArticleDto);
  }

  @Put('/:id')
  async edit(
    @Param() params: FindOneParams,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Article | null> {
    return await this.articleService.updateArticleByParams(
      params.id,
      updateArticleDto,
    );
  }

  @Delete('/:id')
  async delete(@Param() params: FindOneParams) {
    await this.articleService.deleteArticleByParams(params.id);
    return { message: `Berhasil menghapus artikel ${params.id}` };
  }
}
