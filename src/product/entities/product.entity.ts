import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../Category/entities/category.entity";

@Entity({name: 'tb_products'})
 export class Product{
  
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number
    
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    nome: string

    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty()
    @Column({type: "decimal", precision: 10, scale: 2})
    preco:number

    @Column()
    foto: string

    @ManyToOne(() => Category, (category) => category.product, {
        onDelete: 'CASCADE'
    })

    category: Category[]
    

}