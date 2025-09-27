import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigJwt } from '../../../commons/config/jwt.config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const jwtConfig = configService.get<ConfigJwt>('jwt');

        if (!jwtConfig) {
          throw new Error('JWT config not found');
        }

        return {
          global: true,
          secret: jwtConfig.secret,
          signOptions: {
            expiresIn: `${jwtConfig.expiresInSeconds}s`,
          },
        };
      },
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
