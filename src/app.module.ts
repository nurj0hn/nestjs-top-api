import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductsModule } from './products/products.module';
import { ReviewModule } from './review/review.module';
import { ProductsController } from './products/products.controller';
import { TopPageController } from './top-page/top-page.controller';
import { ReviewController } from './review/review.controller';
import { AuthController } from './auth/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './configs/mongo.config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig

    }),
    AuthModule,
    TopPageModule,
    ReviewModule,
    ProductsModule,
  ],
  controllers: [
    AppController,
    ProductsController,
    AuthController,
    TopPageController,
    ReviewController
  ],
  providers: [AppService],
})
export class AppModule { }
