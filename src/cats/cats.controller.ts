import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CatsService } from './cats.service';
// DTOs
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
// Entity
import { Cat } from './cat.entity';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enum/userRole.enum';


@UseGuards(AuthGuard(), RolesGuard)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Roles(Role.admin)
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.createCat(createCatDto);
  }

  @Get()
  findAll(): Promise<Cat[]> {
    return this.catsService.getAllCats(); 
  }

  @Get('/:id')
  findOne(
    @Param('id')
    id: string,
  ): Promise<Cat> {
    return this.catsService.getCatById(id);
  }

  @Delete(':id')
  @Roles(Role.admin)
  deleteCat(@Param('id') id: string): Promise<void> {
    return this.catsService.deleteCat(id);
  }

  @Put(':id')
  @Roles(Role.admin)
  updateCatById(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): Promise<Cat> {
    return this.catsService.updateCatById(id, updateCatDto);
  }
}
