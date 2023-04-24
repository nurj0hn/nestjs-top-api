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
	ValidationPipe
} from '@nestjs/common';
import { FindProductDto } from './dto/find-products.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('products')
export class ProductsController {

	constructor(private readonly productService: ProductsService) { };

	@Post('create')
	async create(@Body() dto: CreateProductDto) {
		return this.productService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const product = this.productService.findById(id);
		if (!product) {
			throw new NotFoundException("not found");
		}
		return product;
	}

	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedProduct = this.productService.deleteById(id);
		if (!deletedProduct) {
			throw new NotFoundException();
		}
		return deletedProduct;
	}

	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateProductDto) {
		const updatedProduct = this.productService.updateById(id, dto);
		if (!updatedProduct) {
			throw new NotFoundException();
		}
		return updatedProduct;
	}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post("find")
	async find(@Body() dto: FindProductDto) {
		return this.productService.findWithReviews(dto);
	}

}
