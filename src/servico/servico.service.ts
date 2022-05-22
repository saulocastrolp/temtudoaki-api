import { Usuario } from 'src/usuario/usuario.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { ResultadoDto } from './../dto/resultado.dto';
import { Servico } from './servico.entity';
import { ServicoCadastrarDto } from './dto/servico.cadastrar.dto';

@Injectable()
export class ServicoService {
  constructor(
    @InjectRepository(Servico)
    private servicoRepository: Repository<Servico>,
  ) {}

  async cadastrar(data: ServicoCadastrarDto, usuario: Usuario): Promise<ResultadoDto> {
    let servico = new Servico();
    servico.titulo = data.titulo;
    servico.descricao = data.descricao;
    servico.usuario = usuario;
    return this.servicoRepository.save(servico)
    .then((resultado) => {
      return <ResultadoDto> {
        status: true,
        mensagem: "Serviço cadastrado com sucesso!"
      }
    })
    .catch((error) => {
      return <ResultadoDto> {
        status: false,
        mensagem: "Houve um erro ao cadastrar o serviço!"
      }
    });
    
  }

}