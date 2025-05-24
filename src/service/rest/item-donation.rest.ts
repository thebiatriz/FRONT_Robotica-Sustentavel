import type { Observable } from "rxjs";
import type { QueryParams } from "../../models/query-params.model";
import api from '../api-Config/rxjs.config';
import type { ItemDonation } from "../../models/item-donation.model";

export class ItemDonationRest {
    getItemDonationById(id: string): Observable<any> {
        return api.get(`/ItemDonation/${id}`);
    }
    getAllItemDonations(params?: QueryParams): Observable<any> {
        return api.get(`/ItemDonation/Paged`, params);
    }
    createItemDonation(itemDonationBody: ItemDonation): Observable<any> {
        return api.post(`/ItemDonation`, itemDonationBody);
    }
}