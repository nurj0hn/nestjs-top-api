import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('top-page')
export class TopPageController {

	constructor(private readonly topPageService: TopPageService) { };

	@Post('create')
	async create(@Body() dto: CreateTopPageDto) {
		return await this.topPageService.create(dto);
	}

	@Get(':id')
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
	async searc(@Param("text") text: string) {
		return this.topPageService.search(text);
	}


	@Get()
	async getAll() {
		return this.topPageService.getAll();
	}

}
