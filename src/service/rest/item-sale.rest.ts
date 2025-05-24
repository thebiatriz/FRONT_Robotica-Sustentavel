import type { Observable } from "rxjs";
import type { QueryParams } from "../../models/query-params.model";
import api from '../api-Config/rxjs.config';
import type { ItemSale } from "../../models/item-sale.model";

export class ItemSaleRest {
    getItemSaleById(id: string): Observable<any> {
        return api.get(`/ItemSale/${id}`);
    }
    getAllItemSales(params?: QueryParams): Observable<any> {
        return api.get(`/ItemSale/Paged`, params);
    }
    createItemSale(itemSaleBody: ItemSale): Observable<any> {
        return api.post(`/ItemSale`, itemSaleBody);
    }
}