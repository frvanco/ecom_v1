import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('catalog')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}

  // ─── Categories ───────────────────────────────────────────

  @Get('categories')
  findAllCategories() {
    return this.catalogService.findAllCategories();
  }

  @UseGuards(JwtGuard)
  @Post('categories')
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.catalogService.createCategory(dto);
  }

  @UseGuards(JwtGuard)
  @Patch('categories/:id')
  updateCategory(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.catalogService.updateCategory(id, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('categories/:id')
  deleteCategory(@Param('id') id: string) {
    return this.catalogService.deleteCategory(id);
  }

  // ─── Products ─────────────────────────────────────────────

  @Get('products')
  findAllProducts(@Query('categoryId') categoryId?: string) {
    return this.catalogService.findAllProducts(categoryId);
  }

  @Get('products/:slug')
  findProductBySlug(@Param('slug') slug: string) {
    return this.catalogService.findProductBySlug(slug);
  }

  @UseGuards(JwtGuard)
  @Post('products')
  createProduct(@Body() dto: CreateProductDto) {
    return this.catalogService.createProduct(dto);
  }

  @UseGuards(JwtGuard)
  @Patch('products/:id')
  updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.catalogService.updateProduct(id, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('products/:id')
  deleteProduct(@Param('id') id: string) {
    return this.catalogService.deleteProduct(id);
  }
}