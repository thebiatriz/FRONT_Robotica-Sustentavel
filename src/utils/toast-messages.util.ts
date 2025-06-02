export enum MessageToasts {
    //COMPUTER
    SUCCESS_CREATE_COMPUTER = "O computador foi registrado.",
    SUCCESS_UPDATE_COMPUTER = "O computador foi atualizado.",
    SUCCESS_DELETE_COMPUTER = "O computador foi deletado.",

    INFO_INSUFFICIENT_COMPUTER = "A quantidade em estoque deve ser maior que zero.",

    //DONATION
    SUCCESS_CREATE_DONATION = "A doação foi registrada.",

    //SALE
    SUCCESS_CREATE_SALE = "A venda foi registrada.",
    ERROR_PRICE_SALE = "Erro ao receber valor de venda do computador.",

    //ERROR
    ERROR_GENERIC = "Erro inesperado. Tente novamente mais tarde.",
    ERROR_FORBIDDEN = "Você não tem permissão para esta ação.",
    ERROR_NOT_FOUND = "O recurso solicitado não foi encontrado.",
    ERROR_SERVER = "Tente novamente mais tarde.",
}