import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { TopPageModel } from './top-page.model';
import { TopPageService } from './top-page.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [TopPageController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TopPageModel,
        schemaOptions: {
          collection: 'TopPage'
        }
      }
    ]),
    ConfigService,
  ],
  providers: [TopPageService],
  exports: [TopPageService],
})
export class TopPageModule { }
