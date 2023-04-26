import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { TopLevelCategory } from './top-page.model';

@Controller('top-page')
export class TopPageController {

	constructor(private readonly topPageService: TopPageService) { };

	@Post('create')
	@HttpCode(200)
	async create(@Body() dto: CreateTopPageDto) {
		return await this.topPageService.create(dto);
	}

	@Get("all")
	@HttpCode(200)
	async getAll() {
		return this.topPageService.getAll();
	}

	@Get(':id')
	@HttpCode(200)
	async get(@Param('id', IdValidationPipe) id: string) {
		return await this.topPageService.findById(id);
	}

	@HttpCode(204)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		return await this.topPageService.deleteById(id);
	}

	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
		const topPage = await this.topPageService.updateById(id, dto);
		if (!topPage) {
			throw new NotFoundException();
		}
		return topPage;
	}

	@HttpCode(200)
	@Post("find")
	async find(@Body() dto: FindTopPageDto) {
		return this.topPageService.findByCategory(dto.firstLevelCategory);
	}

	@Get("textSearch/:text")
	@HttpCode(200)
	async search(@Param("text") text: string) {
		return this.topPageService.search(text);
	}


	

}
