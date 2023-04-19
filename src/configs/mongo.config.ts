import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
	return {
		uri: getMongoString(configService),
		...getMongoOptions()
	};
};

const getMongoString = (configService: ConfigService) =>
	'mongodb://' +
	configService.get('MONGO_USERNAME') + ':' +
	configService.get('MONGO_PASSWORD') + '@' +
	configService.get('MONGO_HOST') + ':' +
	configService.get('MONGO_PORT') + '/?authSource=' +
	configService.get('MONGO_AUTH_DB');


const getMongoOptions = () => ({
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});


// 'mongodb://<username>:<password>@<host:localhost>:<port:27017>/?authSource=<username>;