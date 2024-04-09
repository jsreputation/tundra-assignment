import { Repository } from "typeorm";
import { Cat } from "./cat.entity";
import { CustomRepository } from "./../database/typeorm-ex.decorator";

@CustomRepository(Cat)
export class CatsRepository extends Repository<Cat> {
    async getAllCats(): Promise<Cat[]> {
        const query = this.createQueryBuilder('cat');

        const cats = await query.getMany();
        return cats;
    }
}