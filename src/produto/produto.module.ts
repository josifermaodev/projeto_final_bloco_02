import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaService } from "../categoria/services/categoria.service";
import { CategoriaModule } from "../categoria/categoria.module";
import { Produtos } from "./entities/produto.entity";
import { ProdutoController } from "./controllers/produto.controller";
import { ProdutoService } from "./services/produto.service";


@Module({
    imports:[ TypeOrmModule.forFeature([Produtos]), CategoriaModule],
    controllers:[ProdutoController],
    providers:[ProdutoService, CategoriaService],
    exports:[TypeOrmModule],
})

export class ProdutoModule {}
