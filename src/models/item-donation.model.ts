export interface ComputerSummaryForSale {
    id: number;
    brand: string | null;
    cpu: string;
}

export interface DonationDetails {
    dateDonation: Date;
}

export class ItemDonation {
    constructor(
        public id: number,
        public computerId: number,
        public computer: ComputerSummaryForSale,
        public donationId: number,
        public donation: DonationDetails,
        public quantity: number,
        public status: string,
    ) { }
}