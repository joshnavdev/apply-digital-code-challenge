import { Module, Provider } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ConfigContentful } from '../../../commons/config/contentful.config';
import { CONTENTFUL_SERVICE } from '../../domain/constants';
import { ContentfulServiceImpl } from '../../application/services/contentful.service-impl';

const providers: Provider[] = [{ provide: CONTENTFUL_SERVICE, useClass: ContentfulServiceImpl }];

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const contentfulConfig = configService.get<ConfigContentful>('contentful');

        if (!contentfulConfig) {
          throw new Error('Contentful configuration missing');
        }

        return {
          baseURL: contentfulConfig.baseUrl,
        };
      },
    }),
  ],
  providers: [...providers],
  exports: providers,
})
export class ContentfulModule {}
