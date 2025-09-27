import { Module } from '@nestjs/common';
import { ConfigModule } from './commons/config/config.module';
import { DatabaseModule } from './commons/database/database.module';
import { ProductModule } from './core/presentation/product/product.module';
import { SchedulingModule } from './core/presentation/scheduling/scheduling.module';
import { ReportModule } from './core/presentation/report/report.module';
import { AuthModule } from './core/presentation/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './core/presentation/auth/guards/auth.guard';

@Module({
  imports: [ConfigModule, DatabaseModule, ProductModule, SchedulingModule, ReportModule, AuthModule],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
