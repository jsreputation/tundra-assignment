import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsRepository } from './cat.repository';
import { Cat } from './cat.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Cat]),
    TypeOrmExModule.forCustomRepository([CatsRepository]),
    AuthModule
  ],
  controllers: [CatsController],
  providers: [CatsService, ],
})
export class CatsModule {}
