import { catchError, Observable, of, Subject, take } from "rxjs";
import type { QueryParams } from "../../models/query-params.model";
import { ItemDonationRest } from "../../service/rest/item-donation.rest";
import type { ItemDonation } from "../../models/item-donation.model";

export class ItemDonationService {
    constructor(
        private _itemDonation = new ItemDonationRest(),
    ) { }

    private allDonations$: Subject<any> = new Subject<any>();
    allDonations: Observable<any> = this.allDonations$.asObservable();

    private donation$: Subject<any> = new Subject<any>();
    donation: Observable<any> = this.donation$.asObservable();

    getAllItemDonations(params?: QueryParams): void {
        this._itemDonation
            .getAllItemDonations(params)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.allDonations$.next(response);
                },
                error: (error) => {
                    this.allDonations$.error(error);
                }
            })
    }

    getItemDonationById(id: string): void {
        this._itemDonation
            .getItemDonationById(id)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.donation$.next(response);
                },
                error: (error) => {
                    this.donation$.error(error);
                }
            })
    }

    createItemDonation(itemDonationBody: ItemDonation): void {
        this._itemDonation
            .createItemDonation(itemDonationBody)
            .pipe(take(1), catchError(() => of(null)))
            .subscribe({
                next: (response) => {
                    this.donation$.next(response);
                }
            })
    }
}
