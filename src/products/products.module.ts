import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductsModel } from './products.model';

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
    ])
  ]
})
export class ProductsModule { }
