import { Module, Provider } from '@nestjs/common';
import { ProductOrmEntity } from '../../infrastructure/persistence/typeorm/entities/product.orm-entity';
import { DatabaseModule } from '../../../commons/database/database.module';
import { PRODUCT_REPOSITORY, PRODUCT_SERVICE } from '../../domain/constants';
import { ProductServiceImpl } from '../../application/services/product.service-impl';
import { ProductRepositoryImpl } from '../../infrastructure/persistence/typeorm/repositories/product.repository-impl';
import { ProductController } from './controllers/product.controller';

const providers: Provider[] = [{ provide: PRODUCT_SERVICE, useClass: ProductServiceImpl }];

@Module({
  imports: [DatabaseModule.forFeature([ProductOrmEntity])],
  providers: [...providers, { provide: PRODUCT_REPOSITORY, useClass: ProductRepositoryImpl }],
  controllers: [ProductController],
  exports: providers,
})
export class ProductModule {}
