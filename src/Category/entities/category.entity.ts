import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_categories'})
export class Category {

    @PrimaryGeneratedColumn({type: 'int'})
    id: number

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    type: string
}