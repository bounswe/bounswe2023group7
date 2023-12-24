import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnotationController } from './controllers/annotation.controller';
import { AnnotationRepository } from './repositories/annotation.repository';
import { AnnotationService } from './services/annotation.service';
import { TypeOrmConfigService } from './services/config/typeorm-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      inject: [TypeOrmConfigService],
    }),
    TypeOrmModule.forFeature([
    ]),
  ],
  controllers: [
    AnnotationController,
  ],
  providers: [
    AnnotationService,
    AnnotationRepository
  ],
})
export class AppModule {}
