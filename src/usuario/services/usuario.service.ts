import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { isBefore, subYears } from 'date-fns';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) {}

    async findByUsuario(usuario: string): Promise<Usuario | undefined> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            }
        })
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();


    }

    async findById(id: number): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            }
        });

        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;

    }

    async create(usuario: Usuario): Promise<Usuario> {

        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario) {
            throw new HttpException("O Usuário já existe!", HttpStatus.BAD_REQUEST);
        }

        
        if (!usuario.dataNascimento) {
            throw new HttpException("Data de nascimento é obrigatória.", HttpStatus.BAD_REQUEST);
        }

        const hoje = new Date();
        const idadeMinima = subYears(hoje, 18);

        if (!isBefore(usuario.dataNascimento, idadeMinima)) {
            throw new HttpException("Menores de idade não podem se cadastrar.", HttpStatus.FORBIDDEN);
        }


        
        return await this.usuarioRepository.save(usuario);
    }

    async update(usuario: Usuario): Promise<Usuario> {

        await this.findById(usuario.id);

        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        return await this.usuarioRepository.save(usuario);

    }

}