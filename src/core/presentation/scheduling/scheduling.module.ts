import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ContentfulModule } from '../../infrastructure/contentful/contentful.module';
import { SchedulingCron } from './scheduling.cron';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [ScheduleModule.forRoot(), ContentfulModule, ProductModule],
  providers: [SchedulingCron],
})
export class SchedulingModule {}
