import { AuthService } from './../auth/auth.service';
import { UsuarioService } from './../usuario/usuario.service';
import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Token } from './token.entity';
import { Usuario } from 'src/usuario/usuario.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    private usuarioService: UsuarioService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}


  async save(hash: string, username: string) {
    let objToken =await this.tokenRepository.findOne({username: username});
    if (objToken) {
      this.tokenRepository.update(objToken.id, { hash: hash });
    } else {
      this.tokenRepository.insert({
        hash:hash,
        username: username,
      })
    }
  }

  async refreshToken(oldToken: string) {
    let objToken =await this.tokenRepository.findOne({ hash: oldToken });
    //console.log(objToken, oldToken);
    if (objToken) {
      let usuario = await this.usuarioService.findOne(objToken.username);
      return this.authService.login(usuario);
    } else {
      return new HttpException({
        errorMessage: 'Token Inválido',
      }, HttpStatus.UNAUTHORIZED);
    }
  }

  async getUsuarioByToken(token: string): Promise<Usuario> {
    token = token.replace("Bearer ", "").trim();
    let objToken: Token = await this.tokenRepository.findOne({hash: token});
    if (objToken) {
      let usuario = await this.usuarioService.findOne(objToken.username);
      return usuario;
    } else {
      return null
    }
  }
}