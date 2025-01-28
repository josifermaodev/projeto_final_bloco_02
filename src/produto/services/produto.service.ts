import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produtos } from "../entities/produto.entity";
import { Between, DeleteResult, ILike, Repository } from "typeorm";
import { CategoriaService } from "../../categoria/services/categoria.service";


@Injectable()
export class ProdutoService{
    constructor(
        @InjectRepository(Produtos)
        private produtoRepository: Repository<Produtos>,
        private categoriaService: CategoriaService
    ){}

    async findAll(): Promise<Produtos[]> {
        return await this.produtoRepository.find({
            relations:{
                categoria: true,
            }
        });
    }
    
    async findById(id: number): Promise<Produtos> {
        let produto = this.produtoRepository.findOne({
            where: {
                id
            },
            relations:{
                categoria: true,
            }
        });

        if (!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return produto;
    }

    async findByNome(nome: string): Promise<Produtos[]> {
        return await this.produtoRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations:{
                categoria: true,
            }
        })
    }

    async findByPriceAsc(): Promise<Produtos[]> {
        return await this.produtoRepository.find({
            order: {
                preco: 'ASC'
            },
            relations: {
                categoria: true,
            }
        });
    }

    async findByPriceDesc(): Promise<Produtos[]> {
        return await this.produtoRepository.find({
            order: {
                preco: 'DESC'
            },
            relations: {
                categoria: true,
            }
        });
    }

    async findByPriceRange(min: number, max: number): Promise<Produtos[]> {
        return await this.produtoRepository.find({
            where: {
                preco: Between(min, max),
            },
            relations: {
                categoria: true,
            }
        });
    }

    async create(produto: Produtos): Promise<Produtos> {

        await this.categoriaService.findById(produto.categoria.id)

        return await this.produtoRepository.save(produto);

    }

    async update(produto: Produtos): Promise<Produtos> {
        await this.findById(produto.id)

        await this.categoriaService.findById(produto.categoria.id)

        return await this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);

        return await this.produtoRepository.delete(id);
    }

}