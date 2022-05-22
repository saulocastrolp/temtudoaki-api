import { TokenModule } from './../token/token.module';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicoService } from './servico.service';
import { ServicoController } from './servico.controller';
import { Servico } from './servico.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Servico]),
    TokenModule
  ],
  providers: [ServicoService],
  controllers: [ServicoController],
  exports: [ServicoService],
})
export class ServicoModule {}