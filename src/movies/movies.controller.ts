import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/Movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Movie {
    return this.moviesService.getOne(id);
  }

  @Post()
  create(@Body() movieData) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.moviesService.deleteOne(id);
  }

  @Patch('/:id')
  patch(@Param('id') id: string, @Body() updateData) {
    return this.moviesService.update(id, updateData);
  }
}
