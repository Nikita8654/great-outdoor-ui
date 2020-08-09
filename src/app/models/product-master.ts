import { UserCategory } from './user-category.enum';

export class ProductMaster {
    userId: string;
    userName: string;
    email: string;
    password: string;
    userCategory?: UserCategory;
}
