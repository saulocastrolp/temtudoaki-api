import { TokenModule } from './../token/token.module';
import { TokenService } from './../token/token.service';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategy } from './local.strategy';
import { UsuarioModule } from './../usuario/usuario.module';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsuarioModule, 
    PassportModule,
    TokenModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService, 
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
