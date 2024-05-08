import {ProductDeals} from './productDeals';


export class Deal {
    id?: string;
    productDeals: ProductDeals[];
    weekNumber?: number;
    hours?: number;
    type: string;
    numberProductDeal?: number;
    startDate?: Date;
    year?: number;
}
