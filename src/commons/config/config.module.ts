import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { validationSchema } from './validationSchema';
import AppConfig from './configApp';
import DatabaseConfig from './database.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, DatabaseConfig],
      validationSchema,
    }),
  ],
})
export class ConfigModule {}
