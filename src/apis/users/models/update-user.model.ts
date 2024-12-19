import { Status, UserType } from 'src/constants/enums';

export class UpdateUserModel {
    isVerifyEmail?: boolean;
    fullName?: string;
    email?: string;
    password?: string;
    userType?: UserType;
    status?: Status;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
}
