import { Status } from 'src/constants/enums';

export class CreateUserModel {
    user_name: string;
    password: string;
    email: string;
    is_verify_email: boolean;
    full_name: string;
    phone: string;
    company:string;
    avatar: string;
    status: Status;
    street: string;
    city: string;
    state: string;
    zip_code: string;
    user_type: string;
}
