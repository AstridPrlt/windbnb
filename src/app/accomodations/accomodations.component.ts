import { Component, OnInit } from '@angular/core';
import { HomeItem } from 'src/app/_models/home-item.model';
import DataJson from '../../assets/stays.json';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ApiAirbnbResults, Records } from '../_models/api-airbnb-results.model';
import { WindbnbServiceService } from '../_services/windbnb-service.service';

@Component({
  selector: 'app-accomodations',
  templateUrl: './accomodations.component.html',
  styleUrls: ['./accomodations.component.scss'],
  animations: [
    trigger('layerTransition', [
      state('open', style({
        opacity: 0.4,
        display: 'block'
      })),
      state('closed', style({
        display: 'none',
        opacity: 0
      })),
      transition('open => closed', [
        animate('0.8s')
      ]),
    ])
  ]
})
export class AccomodationsComponent implements OnInit {

  list: any[] = DataJson;

  listToShow!: HomeItem[];
  resultsListApi!: Records[];

  isSearchFormOpened: boolean = false;

  constructor(private service: WindbnbServiceService) { }

  ngOnInit(): void {
    this.listToShow = this.list;
    this.getAirbnbListingAPI();
  }

  searchFormState(event: boolean): void {
    this.isSearchFormOpened = !event;
  }

  filter(filtersInput: Array<any>) {
    let filterByCity = filtersInput[0];
    let filterByPeople = filtersInput[1];
    if (filterByCity == '') {
      this.listToShow = this.list.filter(c => c.maxGuests >= filterByPeople);
    } else {
      this.listToShow = this.list.filter(c => c.city == filterByCity && c.maxGuests >= filterByPeople);
    }
  }

  getAirbnbListingAPI(): void {
    this.service.getApiListing().subscribe({
      next: (result: ApiAirbnbResults) => {
        this.resultsListApi = result.records;
        // console.log(result.records)
      },
    })
  }

}
