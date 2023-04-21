import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';


const loginDto: AuthDto = {
	login: "gsvnfddcovvm",
	password: "1"
}

describe('AuthController (e2e)', () => {
	let app: INestApplication;
	let createdId;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		const { body } = await request(app.getHttpServer()).post('auth/login').send(loginDto);
		await app.init()
		token = body.accessToken;
	});

    it('/auth/login (POST)', async (done) => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.accessToken).toBeDefined();
				done();
			});
	});


	afterAll(() => {
		disconnect();
	})
});
