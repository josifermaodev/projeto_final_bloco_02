import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produtos } from "../../produto/entities/produto.entity";

@Entity({name: "tb_categorias"})
export class Categorias{

    @PrimaryGeneratedColumn()
    id: number;


    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    descricao: string;

    @OneToMany(() => Produtos, (produto) => produto.categoria)
    produto: Produtos[];
}