export class Notification {

    id!: string;


    title!: string;


    arTitle!: string;


    content!: string;

    arContent!: string;

    order?: any | string;

    type!: NotificationTypeEnum;

    product!: any | string;

    report?: any | string;

    productReview?: any | string;

    user?: any | string;

    chat?: any | string;
  
    createdAt!: Date;
  
    updatedAt!: Date;
}

export enum NotificationTypeEnum {
    ORDER = 'ORDER',
    DELIVERY = 'DELIVERY',
    PRODUCT = 'PRODUCT',
    REPORT = 'REPORT',
    REVIEW = 'REVIEW',
    USER = 'USER',
    PAYOUT = 'PAYOUT',
    CHAT = 'CHAT',
    INCOME = 'INCOME'
}
