import { Injectable, NotFoundException } from '@nestjs/common';
import { IArticle } from './interfaces/article.interface';
import { CreateArticleDto } from './dto/create-article.dto';
import { randomUUID } from 'crypto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  //resource
  private article: IArticle[] = [];

  private _findArticleIndex(id: string): number {
    return this.article.findIndex((item) => item.id === id);
  }

  findAllArticle(): IArticle[] {
    return this.article;
  }

  findOneArticle(id: string): IArticle {
    const article = this.article.find((item) => item.id === id);
    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }

  createArticle(createArticleDto: CreateArticleDto) {
    const article: IArticle = {
      id: randomUUID(),
      ...createArticleDto,
    };
    this.article.push(article);
    return article;
  }

  updateArticleByParams(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): IArticle {
    return Object.assign(this.findOneArticle(id), updateArticleDto);
  }

  deleteArticleByParams(id: string): void {
    const index = this._findArticleIndex(id);
    if (index === -1) {
      throw new NotFoundException();
    }
    this.article.splice(index, 1);
  }
}
