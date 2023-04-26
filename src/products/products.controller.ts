import {
	Body,
	Controller,
	Delete,
	Param,
	Post,
	Get,
	Patch,
	HttpCode,
	NotFoundException,
	UsePipes,
	ValidationPipe,
	Query,
	HttpException,
	HttpStatus
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { CATEGORY_AND_LIMIT_REQUIRED, PRODUCT_NOT_FOUDN } from './products.constants';

@Controller('products')
export class ProductsController {

	constructor(private readonly productService: ProductsService) { };

	@HttpCode(201)
	@Post('create')
	async create(@Body() dto: CreateProductDto) {
		return this.productService.create(dto);
	}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Get("find")
	async find(
		@Query("category") category: string,
		@Query("limit") limit: string) {
		if (!category || !limit) {
			throw new HttpException(CATEGORY_AND_LIMIT_REQUIRED, HttpStatus.BAD_REQUEST)
		}
		return this.productService.findWithReviews(category, parseInt(limit));
	}

	@HttpCode(200)
	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const product = this.productService.findById(id);
		if (!product) {
			throw new NotFoundException(PRODUCT_NOT_FOUDN);
		}
		return product;
	}

	@HttpCode(204)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedProduct = this.productService.deleteById(id);
		if (!deletedProduct) {
			throw new NotFoundException(PRODUCT_NOT_FOUDN);
		}
	}

	@HttpCode(202)
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateProductDto) {
		const updatedProduct = this.productService.updateById(id, dto);
		if (!updatedProduct) {
			throw new NotFoundException(PRODUCT_NOT_FOUDN);
		}
		return updatedProduct;
	}



}
