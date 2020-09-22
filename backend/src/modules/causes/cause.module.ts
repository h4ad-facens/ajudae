import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthTokenModule } from '../auth/auth-token.module';
import { OngModule } from '../ong/ong.module';
import { CauseController } from './controllers/cause.controller';
import { CauseEntity } from './entities/cause.entity';
import { CauseService } from './services/cause.service';

@Module({
  imports: [
    AuthTokenModule,
    TypeOrmModule.forFeature([
      CauseEntity,
    ]),
    OngModule,
  ],
  exports: [
    CauseService,
  ],
  providers: [
    CauseService,
  ],
  controllers: [
    CauseController,
  ],
})
export class CauseModule {}
