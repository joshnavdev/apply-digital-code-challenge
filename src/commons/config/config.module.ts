import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { validationSchema } from './validationSchema';
import AppConfig from './configApp';
import DatabaseConfig from './database.config';
import ContentfulConfig from './contentful.config';
import jwtConfig from './jwt.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, DatabaseConfig, ContentfulConfig, jwtConfig],
      validationSchema,
    }),
  ],
})
export class ConfigModule {}
