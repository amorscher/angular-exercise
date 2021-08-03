import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hotel } from '../model/hotels.model';


const HOTEL_API_URL = `https://hotels4.p.rapidapi.com/properties/list`;

@Injectable({
    providedIn: 'root'
})
export class FindHotelsService {

    /**
     * Date format used by the API
     */
    readonly dateFormat: string = 'yyyy-MM-dd';


    constructor(private httpClient: HttpClient, private datePipe: DatePipe) { }


    /**
     * Performs REST call to HOTEL_API_URL to retrieve available hotels
     * @param cityId the API locationId needed to identify the city
     * @returns Obserable of all hotels
     */
    public findHotelsByCityId(cityId: number): Observable<Hotel[]> {

        const today = new Date();
        const inOneWeek = new Date();
        inOneWeek.setDate(inOneWeek.getDate() + 7);


        const httpParams = new HttpParams()
            .append("adults1", '1')
            .append("pageNumber", '1')
            .append("destinationId", cityId.toString())
            .append("pageSize", '25')
            .append("checkOut", this.formatDate(today))
            .append("checkIn", this.formatDate(inOneWeek))
            .append("sortOrder", 'PRICE')
            .append("locale", 'en_US')
            .append("currency", 'EUR');

        const requestOptions = {
            headers: new HttpHeaders(environment.API_KEYS_HEADER),
            params: httpParams
        };

        const foundHotels$ = this.httpClient.get(HOTEL_API_URL, requestOptions).pipe(map(response => {
            const foundHotels: Hotel[] = [];
            //log the response to see the structure
            console.log(response);
            //we do the transformation of the response to our hotel model
            (response as any).data.body.searchResults.results.forEach((result: any) => {
                const hotel: Hotel = {
                    id: result.id,
                    name: result.name,
                    starRating: Math.round(result.starRating),
                    customerRating: result.guestReviews?result.guestReviews.rating:-1,
                    address: result.address.streetAddress,
                    price: result.ratePlan?result.ratePlan.price.exactCurrent:-1
                }
                console.log("Hotel",hotel);
                foundHotels.push(hotel);
            });
            return foundHotels;
        }));

        return foundHotels$;
    }

    /**
     * Formats the given date 
     * @param date 
     * @returns formatted date as string
     */
    private formatDate(date: Date): string  {
        return this.datePipe.transform(date,this.dateFormat)as string;
    }

}
