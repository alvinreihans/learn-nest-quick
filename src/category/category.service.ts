import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  //resource
  constructor(
    @InjectRepository(Category)
    private CategoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = await this.CategoryRepository.save(createCategoryDto);
    return newCategory;
  }

  async findAll(): Promise<Category[]> {
    return await this.CategoryRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.CategoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);
    const editedCategory = Object.assign(category, updateCategoryDto);
    return await this.CategoryRepository.save(editedCategory);
  }

  async remove(id: string): Promise<void> {
    const category = await this.CategoryRepository.delete(id);
    if (category.affected === 0) {
      throw new NotFoundException();
    }
  }
}
