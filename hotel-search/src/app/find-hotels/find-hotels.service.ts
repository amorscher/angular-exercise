import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hotel } from '../model/hotels.model';



const HOTEL_API_URL = `https://hotels4.p.rapidapi.com/properties/v2/list`;

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
        console.log(today)
        const inOneWeek = new Date();
        inOneWeek.setDate(inOneWeek.getDate() + 7);



        const requestBody = {
            "currency": "EUR",
            "eapid": 1,
            "locale": "de_DE",
            "siteId": 300000001,
            "destination": {
                "regionId": cityId.toString()
            },
            "checkInDate": {
                "day": today.getDate(),
                "month": today.getMonth() + 1,
                "year": today.getFullYear()
            },
            "checkOutDate": {
                "day": inOneWeek.getDate(),
                "month": inOneWeek.getMonth() + 1,
                "year": today.getFullYear()
            },
            "rooms": [
                {
                    "adults": 2
                }
            ],
            "resultsStartingIndex": 0,
            "resultsSize": 30,
            "sort": "PRICE_LOW_TO_HIGH",
        }

        const requestOptions = {
            headers: new HttpHeaders({ 'content-type': 'application/json', ...environment.API_KEYS_HEADER }),
        };

        const foundHotels$ = this.httpClient.post(HOTEL_API_URL, requestBody, requestOptions).pipe(map(response => {
            const foundHotels: Hotel[] = [];
            //log the response to see the structure
            console.log(response);
            //we do the transformation of the response to our hotel model
            (response as any).data.propertySearch.properties.forEach((result: any) => {
                const hotel: Hotel = {
                    id: result.id,
                    name: result.name,
                    starRating: result.star?result.star:Math.floor(Math.random() * 5),
                    customerRating: result.reviews.score,
                    location: result.destinationInfo.distanceFromMessaging,
                    price: result.price ? result.price.lead.amount : -1
                }
                console.log(hotel);
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
    private formatDate(date: Date): string {
        return this.datePipe.transform(date, this.dateFormat) as string;
    }

}
