import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";

@Entity({name: 'tb_categories'})
export class Category {

    @PrimaryGeneratedColumn({type: 'int'})
    id: number

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    type: string

    @OneToMany(() => Product, (product) => product.category)
    product: Product[]
}