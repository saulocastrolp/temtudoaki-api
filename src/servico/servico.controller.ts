import { TokenService } from './../token/token.service';
import { Usuario } from 'src/usuario/usuario.entity';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { AuthService } from './../auth/auth.service';
import { Body, Controller, Get, Post, Req, Request, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


import { ResultadoDto } from './../dto/resultado.dto';
import { ServicoCadastrarDto } from './dto/servico.cadastrar.dto';
import { ServicoService } from './servico.service';
import { Servico } from './servico.entity';


@Controller('servico')
export class ServicoController {
  constructor(
    private readonly servicoService: ServicoService,
    private readonly tokenService: TokenService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('cadastrar')
  async cadastrar(@Body() data: ServicoCadastrarDto, @Req() req): Promise<ResultadoDto> {
    let token = req.headers.authorization;
    console.log(token);
    let usuario: Usuario = await this.tokenService.getUsuarioByToken(token);
    if (usuario) {
      return this.servicoService.cadastrar(data, usuario);
    } else {
      throw new HttpException({
        errorMessage: "Token inválido"
      }, HttpStatus.UNAUTHORIZED);
    }
    
  }
}
