import { UsuarioModule } from './../usuario/usuario.module';
import { TokenController } from './token.controller';
import { AuthModule } from './../auth/auth.module';
import { AuthService } from './../auth/auth.service';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from './token.service';
import { Token } from './token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    forwardRef(() => AuthModule),
    UsuarioModule,
  ],
  providers: [TokenService],
  controllers: [TokenController],
  exports: [TokenService],
})
export class TokenModule {}