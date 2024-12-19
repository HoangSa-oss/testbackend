export enum EmailStatus {
    INIT,
    SENT_TO_MAILGUN,
    DELIVERED,
    FAILED,
    OPENED,
    CLICKED,
    UNSUBSCRIBED,
}

export enum EmailType {
    WELCOME,
    MINTED_NFT,
    FINISH_CAMPAIGN,
    RESET_PASSWORD,
}
