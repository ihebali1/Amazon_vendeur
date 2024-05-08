import { Notification } from "./notification";
export class UserNotification {

    id!: string;
  
    notification!: Notification;

    isSeen!: boolean;
  
    createdAt!: Date;
  
    updatedAt!: Date;

    icon?:  any;
    colorClass?: string;
}