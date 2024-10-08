import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Category } from "../entities/category.entity";

@Injectable()
export class CategoryService{

    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository <Category>
    ) {}

    async findAll(): Promise<Category[]>{
        return await this.categoryRepository.find({
            relations:{
                product: true
            }
        });
    }

    async findById(id: number): Promise<Category>{
        let category = await this.categoryRepository.findOne({
            where: {id},
            relations: {
                product: true
            }
        })

        if(!category){
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
        }
        
        return category
    }

    async findByType(type: string): Promise<Category[]>{
        return await this.categoryRepository.find({
            where: {
                type: ILike(`%${type}%`)
            },
            relations: {
                product: true
            }
        })
    }
    
    async create(category: Category): Promise<Category>{
        return await this.categoryRepository.save(category)
    }

    async update(category: Category): Promise<Category>{
        let searchCategory = await this.findById(category.id)

        if(!searchCategory || !category.id){
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
        }

        return await this.categoryRepository.save(category);
    }

    async delete(id:number): Promise<DeleteResult>{
        let searchCategory = await this.findById(id);
        
        if(!searchCategory){
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
        }

        return await this.categoryRepository.delete(id)
   }

}