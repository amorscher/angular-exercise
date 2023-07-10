

/**
 * All available cities for search
 * Map of city-name to locationid provided by the API
 */
export const CITIES = {

  Bregenz:5100,
  Bludenz:500274,
  Dornbirn:5101

}

export interface Hotel{

    id:number

    name:string;
    location:string

    starRating:number;
    customerRating:number;

    price:number;

}
