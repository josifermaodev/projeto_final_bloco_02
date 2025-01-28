import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseFloatPipe, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { Produtos } from "../entities/produto.entity";
import { ProdutoService } from "../services/produto.service";


@Controller('/produtos')
export class ProdutoController{
    
    constructor(
        private readonly produtoService: ProdutoService,
    ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produtos[]>{
        return this.produtoService.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Produtos> {
        return this.produtoService.findById(id);
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome') nome: string): Promise<Produtos[]> {
        return this.produtoService.findByNome(nome);
    }

    // Método para filtrar produtos do maior preço para o menor
    @Get('/preco/crescente')
    @HttpCode(HttpStatus.OK)
    findByPriceAsc(): Promise<Produtos[]> {
        return this.produtoService.findByPriceAsc();
    }

    @Get('/preco/decrescente')
    @HttpCode(HttpStatus.OK)
    findByPriceDesc(): Promise<Produtos[]> {
        return this.produtoService.findByPriceDesc();
    }

    @Get('/preco/faixa')
    @HttpCode(HttpStatus.OK)
    findByPriceRange(@Query('min', ParseFloatPipe) min: number, @Query('max', ParseFloatPipe) max: number,): Promise<Produtos[]> {
        return this.produtoService.findByPriceRange(min, max);
    }
    

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produtos): Promise<Produtos> {
        return this.produtoService.create(produto);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produtos): Promise<Produtos> {
        return this.produtoService.update(produto);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.produtoService.delete(id);
    }

}