import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private findHotelService: FindHotelsService){
    this.hotels$ = this.findHotelService.findHotelsByCityId(CITIES.Dornbirn);

  }
}
