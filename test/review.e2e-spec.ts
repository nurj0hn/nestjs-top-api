import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';


const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
	name: "Test",
	title: "teste Titile",
	description: "test description",
	rating: 3,
	productId,
}

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/review/create (POST)', async (done) => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				console.log(body)
				expect(createdId).toBeDefined();
				done();
			});
	});

	it('/review/create (POST) -- fail', async (done) => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send({ ...testDto, rating: 0 })
			.expect(400)
			.then(({ body }: request.Response) => {
				console.log(body)
				done();
			});
	});


	it('/review/byProduct/:productId (GET)', async (done) => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + productId)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(body.length);
				done();
			});
	});

	it('/review/:id (DELETE)', () => {
		return request(app.getHttpServer())
			.delete('/review/' + createdId)
			.expect(200);
	});

	it('/review/:id (DELETE) -- fail', () => {
		return request(app.getHttpServer())
			.delete('/review/' + new Types.ObjectId().toHexString())
			.expect(404);
	});

	afterAll(() => {
		disconnect();
	})
});