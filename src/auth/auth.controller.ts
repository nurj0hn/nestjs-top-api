import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) { }

	@UsePipes(new ValidationPipe())
	@HttpCode(201)
	@Post('register')
	async register(@Body() dto: AuthDto) {
		const oldUser = await this.authService.finduser(dto.login);
		console.log(oldUser)
		if (oldUser) {
			throw new BadRequestException(ALREDY_EXIST);
		}
		return this.authService.createuser(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() { login, password }: AuthDto) {
		const { email } = await this.authService.validateUser(login, password);
		return await this.authService.login(email);
	}

}
