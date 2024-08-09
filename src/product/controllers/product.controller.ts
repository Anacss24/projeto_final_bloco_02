import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseFloatPipe, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { Product } from "../entities/product.entity";

@Controller("/products")
 export class ProductController {

   constructor(private readonly productService: ProductService) {}

   @Get()
   @HttpCode(HttpStatus.OK)
   findAll(): Promise<Product[]>{
    return this.productService.findAll()
   }

   @Get('/:id')
   @HttpCode(HttpStatus.OK)
   findById(@Param('id', ParseIntPipe) id: number): Promise<Product>{
    return this.productService.findById(id)
   }

   @Get("/nome/:nome")
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome')nome: string): Promise<Product[]>{
        return this.productService.findByNome(nome)
    }
    @Get("/maiorpreco/:preco")
    @HttpCode(HttpStatus.OK)
    maiorPreco(@Param('preco', ParseFloatPipe)preco: number):Promise<Product[]>{
        return this.productService.maiorPreco(preco)
    }

    @Get("/menorpreco/:preco")
    @HttpCode(HttpStatus.OK)
    menorPreco(@Param('preco', ParseFloatPipe)preco: number):Promise<Product[]>{
        return this.productService.menorPreco(preco)
    }
   @Post()
   @HttpCode(HttpStatus.CREATED)
   create(@Body() product: Product): Promise<Product>{
    return this.productService.create(product)
   }


   @Put()
   @HttpCode(HttpStatus.OK)
    upadate(@Body() product: Product): Promise<Product>{
        return this.productService.update(product)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.productService.delete(id)
    }



 }