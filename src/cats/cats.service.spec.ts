import { Test } from "@nestjs/testing";
import { CatsService } from "./cats.service";
import { CatsRepository } from "./cat.repository";
import { NotFoundException } from "@nestjs/common";

const mockCatsRepository = () => ({
    getAllCats: jest.fn(),
    findOne: jest.fn()
});

describe('CatsService', () => {
    let catsService: CatsService;
    let catsRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                CatsService,
                { provide: CatsRepository, useFactory: mockCatsRepository }
            ],
        }).compile();

        catsService = module.get(CatsService);
        catsRepository = module.get(CatsRepository)
    });

    describe('Get All Cats', () => {
        it('calls CatsRepository.getAllCats and returns the result',async () => {
            expect(catsRepository.getAllCats).not.toHaveBeenCalled();
            catsRepository.getAllCats.mockResolvedValue('someValue');
            const result = await catsService.getAllCats()
            expect(catsRepository.getAllCats).toHaveBeenCalled();
            expect(result).toEqual('someValue');
        });
    });

    describe('getCatById', () => {
        it('calls CatsRepository.findOne and returns the result', async () => {
            const mockCat = {
                id: 'random Id',
                name: 'Test Cat Name',
                age: 5,
                breed: 'Random Breed',
            };
            catsRepository.findOne.mockResolvedValue(mockCat);
            const result = await catsService.getCatById('random Id');
            expect(result).toEqual(mockCat);
        });

        it('calls CatsRepository.findOne and handles error', async () => {
            catsRepository.findOne.mockResolvedValue(null);
            expect(catsService.getCatById('random Id')).rejects.toThrow(NotFoundException);
        });
    });
});