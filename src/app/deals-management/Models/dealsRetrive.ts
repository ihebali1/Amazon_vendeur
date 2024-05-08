import {ProductDealsRetreive} from "./ProductDealsRetreive";


export class Deal {
    id?: string;
    createdAt: Date;
    dealProducts: ProductDealsRetreive[];
    dealType: string;
    discount?: number;
    endDate: Date;
    numberProductDeal: number;
    redemptionLimit?: boolean;
    startDate: Date;
    updatedAt: Date;
}


