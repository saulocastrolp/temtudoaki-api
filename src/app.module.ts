import { Token } from './token/token.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { Usuario } from './usuario/usuario.entity';
import { AuthModule } from './auth/auth.module';
import { Servico } from './servico/servico.entity';
import { ServicoModule } from './servico/servico.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '129792',
      database: 'temtudoaki',
      entities: [Usuario, Token, Servico],
      synchronize: true,
    }),
    AuthModule,
    ServicoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
