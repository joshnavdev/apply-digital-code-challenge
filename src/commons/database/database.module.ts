import { Module } from '@nestjs/common';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import { ConfigService } from '@nestjs/config';
import { ConfigApp, EnvironmentEnum } from '../config/configApp';
import { ConfigDatabase } from '../config/database.config';

@Module({
  imports: [
    TypeOrmCoreModule.forRootAsync({
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
        };
      },
    }),
  ],
})
export class DatabaseModule {}
