import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { FindOneParams } from 'src/category/dto/find-one.params';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get('/:id')
  async findOne(@Param() params: FindOneParams): Promise<Category | null> {
    return await this.categoryService.findOne(params.id);
  }

  @Put('/:id')
  async edit(
    @Param() params: FindOneParams,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | null> {
    return await this.categoryService.update(params.id, updateCategoryDto);
  }

  @Delete('/:id')
  async remove(@Param() params: FindOneParams) {
    await this.categoryService.remove(params.id);
    return { message: `Berhasil menghapus kategori ${params.id}` };
  }
}
