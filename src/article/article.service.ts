import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArticleService {
  //resource
  constructor(
    @InjectRepository(Article)
    private ArticleRepository: Repository<Article>,
  ) {}

  async findAllArticle(): Promise<Article[]> {
    return await this.ArticleRepository.find();
  }

  async findOneArticle(id: string): Promise<Article> {
    const article = await this.ArticleRepository.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }

  async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
    const newArticle = await this.ArticleRepository.save(createArticleDto);
    return newArticle;
  }

  async updateArticleByParams(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.findOneArticle(id);
    const editedArticle = Object.assign(article, updateArticleDto);
    return await this.ArticleRepository.save(editedArticle);
  }

  async deleteArticleByParams(id: string): Promise<void> {
    const article = await this.ArticleRepository.delete(id);
    if (article.affected === 0) {
      throw new NotFoundException();
    }
  }
}
