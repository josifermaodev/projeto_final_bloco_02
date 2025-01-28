import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categorias } from "../entities/categoria.entity";
import { DeleteResult, ILike, Repository } from "typeorm";


@Injectable()
export class CategoriaService{

    constructor(
        @InjectRepository(Categorias)
        private categoriaRepository: Repository<Categorias>
    ){}

    async findAll(): Promise<Categorias[]> {
        return await this.categoriaRepository.find({
            relations:{
                produto: true
            }
        });
    }
    
    async findById(id: number): Promise<Categorias> {
        let categoria = this.categoriaRepository.findOne({
            where: {
                id
            },
            relations:{
                produto: true
            }
        });

        if (!categoria)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

        return categoria;
    }

    async findByDescricao(descricao: string): Promise<Categorias[]> {
        return await this.categoriaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`)
            },
            relations:{
                produto: true
            }
        })
    }

    async create(categoria: Categorias): Promise<Categorias> {

        return await this.categoriaRepository.save(categoria);

    }

    async update(categoria: Categorias): Promise<Categorias> {
        await this.findById(categoria.id)

        return await this.categoriaRepository.save(categoria);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);

        return await this.categoriaRepository.delete(id);
    }

}