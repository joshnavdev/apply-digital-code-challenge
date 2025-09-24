import { Module } from '@nestjs/common';
import { ConfigModule } from './commons/config/config.module';
import { DatabaseModule } from './commons/database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
