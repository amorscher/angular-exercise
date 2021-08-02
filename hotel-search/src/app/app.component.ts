import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FindHotelsService } from './find-hotels/find-hotels.service';
import { CITIES, Hotel } from './model/hotels.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hotel-search';
  hotels$: Observable<Hotel[]>;
  cityNames = Object.keys(CITIES);
  cities:any = CITIES;
  loading = false;


 public searchForm:FormGroup = new FormGroup({
    city: new FormControl(this.cities.Bludenz),
    fromDate: new FormControl("2021-08-03"),
    toDate: new FormControl("2021-08-03")
  });


  constructor(private findHotelService: FindHotelsService){
     this.hotels$ = of([]);
    // this.findHotelService.findHotelsByCityId(CITIES.Dornbirn);

  }

  public search(){
    this.loading =true;
    this.hotels$ = this.findHotelService.findHotelsByCityId(this.searchForm.value.city).pipe(tap(()=>this.loading=false));
    console.log(this.searchForm.value);
  }

}
