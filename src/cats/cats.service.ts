import { Injectable, NotFoundException } from '@nestjs/common';
// DTOs
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatsRepository } from './cat.repository';
import { InjectRepository } from '@nestjs/typeorm';
// Entity
import { Cat } from './cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(CatsRepository)
    private catsRepository: CatsRepository
  ) {}
  // private cats: Cat[] = [];

  async createCat(createCatDto: CreateCatDto): Promise<Cat> {
    const { name, age, breed } = createCatDto;
    const cat = this.catsRepository.create({
      name,
      age,
      breed,
    })
    
    await this.catsRepository.save(cat);
    return cat;
  }

  async getAllCats(): Promise<Cat[]> {
      return this.catsRepository.getAllCats();
  }

  async getCatById(id: string): Promise<Cat> {
    const cat = await this.catsRepository.findOne({
      where: {
        id: id
      }
    });

    if (!cat) {
      throw new NotFoundException(`Cat with ID '${id}' not found`);
    }

    return cat;
  }


  async updateCatById(id, updateCatDto: UpdateCatDto): Promise<Cat> {
    const { name, age, breed } = updateCatDto;

    const updatedCat = await this.getCatById(id);

    if (name) {
      updatedCat.name = name;
    }
    if (age) {
      updatedCat.age = age;
    }
    if (breed) {
      updatedCat.breed = breed;
    }

    await this.catsRepository.save(updatedCat)
    return updatedCat;
  }

  async deleteCat(id: string): Promise<void> {
    const result = await this.catsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cat with ID '${id}' not found`);
    }  
  }
}
