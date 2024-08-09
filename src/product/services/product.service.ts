import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../entities/product.entity";
import { DeleteResult, ILike, LessThan, MoreThan, Repository } from "typeorm";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ){}
   
    async findAll(): Promise<Product[]>{
        return await this.productRepository.find({
            relations: {
                category: true
            }
        })
    }

    async findById(id: number): Promise<Product>{
        return await this.productRepository.findOne({
            where:{id},
            relations: {
                category: true
            }
        })
    }

    async findByNome(nome: string): Promise<Product[]>{
        return await this.productRepository.find({
             where:{
                 nome: ILike(`%${nome}%`)
             },
             relations:{
                 category: true,
             }
         })
     }

     async maiorPreco(preco: number): Promise<Product[]>{
        return await this.productRepository.find({
            where:{
                preco: MoreThan(preco)
            },
        })
    }

    async menorPreco(preco: number): Promise<Product[]>{
        return await this.productRepository.find({
            where:{
                preco: LessThan(preco)
            },
        })
    }

    async create(product: Product): Promise<Product>{
        return await this.productRepository.save(product)

    }

    async update(product: Product): Promise<Product>{
        let searchProduct = await this.findById(product.id)

        if(!searchProduct || !product.id){
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
        }

        return this.productRepository.save(product)
    }

    async delete(id: number): Promise<DeleteResult>{
       let searchProduct = await this.findById(id)

       if(!searchProduct){
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
       }

       return this.productRepository.delete(id)
    
    }
} 