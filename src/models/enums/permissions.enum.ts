export enum Permissions {
    GET_REPORT = 1 << 0, // 1
    CREATE_USER = 1 << 1, // 2
    UPDATE_USER = 1 << 2, // 4
    GET_USER = 1 << 3, // 8
    FULL_OPERATOR = 1 << 29, // Assign a high bit for super admin privileges
    FULL_ADMIN = 1 << 30, // Assign a high bit for super admin privileges
}
