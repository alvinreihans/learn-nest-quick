import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';

@Controller('article')
export class ArticleController {
  @Get()
  findAll(): string {
    return 'Tampilkan semua artikel';
  }

  @Get('/:id')
  findOne(@Param('id') id: string): string {
    return `Tampilkan detail artikel ${id}`;
  }

  @Post()
  create(): string {
    return 'Tambah artikel';
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
