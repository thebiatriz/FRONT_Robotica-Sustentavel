export interface ComputerSummaryForSale {
    id: number;
    brand: string | null;
    cpu: string;
}

export interface SaleDetails {
    saleDate: Date;
    priceSale: number;
}

export class ItemSale {
    constructor(
        public id: number,
        public computerId: number,
        public computer: ComputerSummaryForSale,
        public saleId: number,
        public sale: SaleDetails,
        public quantity: number,
        public status: string,
    ) { }
}