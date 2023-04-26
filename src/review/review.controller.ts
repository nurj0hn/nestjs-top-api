import {
	Controller,
	Body,
	Post,
	Delete,
	Param,
	Get,
	HttpException,
	HttpStatus,
	UsePipes,
	ValidationPipe,
	UseGuards,
	HttpCode
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { userEmail } from '../decorators/user-email.decorator';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('review')
export class ReviewController {

	constructor(private readonly reviewService: ReviewService) { }

	@UsePipes(new ValidationPipe())
	@Post('create')
	@HttpCode(201)
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	@HttpCode(201)
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedDoc = await this.reviewService.delete(id);
		if (!deletedDoc) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	@HttpCode(204)
	async deleteByProducId(@Param('productId', IdValidationPipe) productId: string) {
		const deletedDoc = await this.reviewService.deleteByProductId(productId);
		if (!deletedDoc) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@UseGuards(JwtAuthGuard)
	@HttpCode(200)
	@Get('byProduct/:productId')
	async getByproduct(@Param('productId', IdValidationPipe) productId: string, @userEmail() email: string) {
		console.log(email)
		return this.reviewService.findByProductId(productId);
	}

	@Get('all')
	@HttpCode(200)
	async getAll() {
		return this.reviewService.getAll();
	}
}
