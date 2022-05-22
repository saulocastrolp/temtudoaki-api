import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import * as bcrypt from 'bcrypt';

import { ResultadoDto } from './../dto/resultado.dto';
import { UsuarioCadastrarDto } from './dto/usuario.cadastrar.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async remove(id: string): Promise<void> {
    await this.usuarioRepository.delete(id);
  }

  async cadastrar(data: UsuarioCadastrarDto): Promise<ResultadoDto> {
    let usuario = new Usuario();
    usuario.nome = data.nome;
    usuario.email = data.email;
    usuario.password = bcrypt.hashSync(data.senha, 8);
    usuario.cpf = data.cpf;
    usuario.telefone = data.telefone;
    return this.usuarioRepository.save(usuario)
    .then((resultado) => {
      return <ResultadoDto> {
        status: true,
        mensagem: "Usuário cadastrado com sucesso!"
      }
    })
    .catch((error) => {
      return <ResultadoDto> {
        status: false,
        mensagem: "Houve um erro ao cadastrar o usuário!"
      }
    });
    
  }

  async findOne(email: string): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({email: email});
  }

}