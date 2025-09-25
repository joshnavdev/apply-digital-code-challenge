import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigApp, EnvironmentEnum } from '../config/configApp';
import { ConfigDatabase } from '../config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const appConfig = configService.get<ConfigApp>('app');
        const databaseConfig = configService.get<ConfigDatabase>('database');

        if (!appConfig) {
          throw new Error('App configuration is not available');
        }

        if (!databaseConfig) {
          throw new Error('Database configuration is not available');
        }

        return {
          type: 'postgres',
          host: databaseConfig.host,
          username: databaseConfig.username,
          password: databaseConfig.password,
          database: databaseConfig.database,
          port: databaseConfig.port,
          autoLoadEntities: true,
          synchronize: appConfig.env === EnvironmentEnum.DEV,
          logging: appConfig.env === EnvironmentEnum.DEV,
        };
      },
    }),
  ],
})
export class DatabaseModule {
  static forFeature(entities: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(entities);
  }
}
