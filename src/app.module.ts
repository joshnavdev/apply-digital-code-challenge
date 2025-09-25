import { Module } from '@nestjs/common';
import { ConfigModule } from './commons/config/config.module';
import { DatabaseModule } from './commons/database/database.module';
import { ProductModule } from './core/presentation/product/product.module';
import { SchedulingModule } from './core/presentation/scheduling/scheduling.module';

@Module({
  imports: [ConfigModule, DatabaseModule, ProductModule, SchedulingModule],
})
export class AppModule {}
