export enum PermissionEnum {
    user_create = 'User Create',
    user_update = 'User Update',
    user_view = 'User View',
    user_delete = 'User Delete',
}

export enum UserType {
    SuperAdmin = 'SUPER_ADMIN',
    SystemAdmin = 'SYSTEM_ADMIN',
    Operator = 'OPERATOR',
    User = 'USER',
}

export enum Status {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
}

export enum EmailStatus {
    INIT = 'INIT',
    SENT_TO_MAILGUN = 'SENT_TO_MAILGUN',
    DELIVERED = 'DELIVERED',
    FAILED = 'FAILED',
    OPENED = 'OPENED',
    CLICKED = 'CLICKED',
    UNSUBSCRIBED = 'UNSUBSCRIBED',
}

export enum EmailType {
    RESERVATION = 'RESERVATION',
    RESET_PASSWORD = 'RESET_PASSWORD',
    CHANGE_PASSWORD = 'CHANGE_PASSWORD',
}

export enum EmailTemplate {
    RESERVATION = 'reservation_template',
    RESET_PASSWORD = 'reset_password_template',
    CHANGE_PASSWORD = 'change_password_template',
}

export enum EmailSubject {
    RESERVATION = 'Xin chân thành cám ơn Quý Khách đã đăng kí và ủng hộ Sumo Tour',
    RESET_PASSWORD = 'Yêu cầu Đặt Lại Mật Khẩu',
}

export enum PromotionStatus {
    INACTIVATED = 'INACTIVATED',
    ACTIVATED = 'ACTIVATED',
    EXPIRED = 'EXPIRED',
}

export enum PaymentStatus {
    UNPAID = 'UNPAID',
    PAID = 'PAID',
}

export enum PaymentMethod {
    INTERNET_BANKING = 'INTERNET_BANKING',
}

export enum PostStatus {
    DRAFT = 'DRAFT',
    PUBLIC = 'PUBLIC',
}

export enum ContactStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    DONE = 'DONE',
}

export enum ReservaitonStatus {
    NOT_START = 'NOT_START',
    PROCESSING = 'PROCESSING',
    DONE = 'DONE',
}

export enum CashbackStatus {
    REQUEST = 'REQUEST',
    INPROGRESS = 'INPROGRESS',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
}

export enum PointType {
    RESERVATION = 'RESERVATION',
    SEND_GIF = 'SEND_GIF',
}

export enum Status {
    PENDING = 'PENDING',
    DONE = 'DONE',
}

export enum CodeType {
    RESET_PASSWORD = 'RESET_PASSWORD',
}
