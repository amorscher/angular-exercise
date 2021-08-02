

/**
 * All available cities for search
 * Map of city-name to locationid provided by the API
 */
export const CITIES = {

    Bregenz:32999,
    Bludenz:43390,
    Dornbirn:34748

}


export interface Hotel{

    id:number

    name:string;
    address:string

    starRating:number;
    customerRating:number;

    price:number;

}