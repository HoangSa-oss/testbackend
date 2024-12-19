import 'dotenv/config';

export const SYSTEM_ADMIN = 'SYSTEM_ADMIN';
export const USER_LOGIN = 'USER_LOGIN';

export const ROLES = {
    ADMIN: process.env.ROLE_ADMIN,
    USER: process.env.ROLE_USER,
    OPERATOR: process.env.ROLE_OPERATOR,
};
export const EMAIL = {
    EMAIL_USER:process.env.EMAIL_USER,
    EMAIL_PASSWORD:process.env.EMAIL_PASSWORD,
    EMAIL_HOST:process.env.EMAIL_HOST,
    EMAIL_PORT:process.env.PORT
    
}
export const TENANTS = {
    ADMIN: process.env.TENANT_ADMIN
};

export const USERS = {
    ADMIN_ID: process.env.USER_ADMIN_ID,
    USER_ID: process.env.USER_ID,
};

export const PERMISSIONS = {
    user_create: { id: '632350d570200e4967e428bc', name: 'User Create' },
    user_update: { id: '632350df1c50e70ec4755af2', name: 'User Update' },
    user_view: { id: '632350e5e5fb4425087495da', name: 'User View' },
    user_delete: { id: '632350ea71a8add4f683f10a', name: 'User Delete' },
    role_create: { id: '632d84fa3eaae45807668438', name: 'Role Create' },
    role_update: { id: '632d84ff817b028eb20a894f', name: 'Role Update' },
    role_view: { id: '632d8504c6a291c274d080b3', name: 'Role View' },
    role_delete: { id: '632d850891140cbf1dff5209', name: 'Role Delete' },
    role_assign: {
        id: '632d8c78b214f12f5f328cc7',
        name: 'Assign role to user',
    },
    category_create: {
        id: '632d850c2870f279be5c52b8',
        name: 'Category Create',
    },
    category_update: {
        id: '632d8510e1952dd628e87fa2',
        name: 'Category Update',
    },
    category_view: { id: '632d8514113010b01bc703f4', name: 'Category View' },
    category_delete: {
        id: '632d851771ce70ccbb5e94f1',
        name: 'Category Delete',
    },
};

export const USER_CONFIG = {
    POINT_CONFIG: 'POINT_CONFIG',
};
