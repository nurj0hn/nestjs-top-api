import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductsModel } from './products.model';
import { ProductsService } from './products.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ProductsController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ProductsModel,
        schemaOptions: {
          collection: 'Product'
        }
      }
    ]),
    ConfigModule,
  ],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule { }
