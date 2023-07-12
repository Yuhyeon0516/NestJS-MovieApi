import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return an array', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2023,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('shold throw 404 error(Not Found Exception)', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID 999 not found`);
      }
    });
  });

  describe('deleteOne()', () => {
    it('delete a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2023,
      });

      const beforeDeleteLength = service.getAll().length;
      service.deleteOne(1);
      const afterDeleteLength = service.getAll().length;

      expect(afterDeleteLength).toBeLessThan(beforeDeleteLength);
    });

    it('shold throw 404 error(Not Found Exception)', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID 999 not found`);
      }
    });
  });

  describe('create()', () => {
    it('should create a new movie', () => {
      const beforeCreateLength = service.getAll().length;
      service.create({
        title: 'Test2 Movie',
        genres: ['test'],
        year: 2023,
      });
      const afterCreateLength = service.getAll().length;
      expect(afterCreateLength).toBeGreaterThan(beforeCreateLength);
    });
  });

  describe('update()', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test3 Movie',
        genres: ['test'],
        year: 2023,
      });

      service.update(1, { title: 'Update Test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Update Test');
    });

    it('shold throw 404 error(Not Found Exception)', () => {
      try {
        service.update(999, { title: 'Miss Update' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID 999 not found`);
      }
    });
  });
});
