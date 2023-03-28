import { Component, OnInit } from '@angular/core';
import { HomeItem } from 'src/app/_models/home-item.model';
import DataJson from '../../assets/stays.json';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ApiAirbnbResults, Records } from '../_models/api-airbnb-results.model';
import { WindbnbServiceService } from '../_services/windbnb-service.service';
import UnsplashImagesJson from '../../assets/unsplashImages.json';

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

  // list: any[] = DataJson;

  listToShow!: Records[];
  resultsListApi!: Records[];

  isSearchFormOpened: boolean = false;
  imagesUrl!: string[];

  constructor(private service: WindbnbServiceService) { }

  ngOnInit(): void {
    this.getAirbnbListingAPI();

    this.imagesUrl = UnsplashImagesJson.map(i => i.urls.small);
  }

  searchFormState(event: boolean): void {
    this.isSearchFormOpened = !event;
  }

  filter(filtersInput: Array<any>) {
    let filterByCity = filtersInput[0];
    let filterByPeople = filtersInput[1];
    if (filterByCity == '') {
      this.listToShow = this.resultsListApi.filter(c => c.record.fields.accommodates >= filterByPeople);
    } else {
      this.listToShow = this.resultsListApi.filter(c => c.record.fields.zipcode == filterByCity && c.record.fields.accommodates >= filterByPeople);
      let indexesList: number[] = [];
      this.listToShow.forEach(element => {
        indexesList.push(this.resultsListApi.indexOf(element))
      });
      console.log(indexesList);

    }
  }

  getAirbnbListingAPI(): void {
    this.service.getApiListing().subscribe({
      next: (result: ApiAirbnbResults) => {
        this.resultsListApi = result.records;
        this.resultsListApi.forEach((r, index) => r.record.fields.picture_url.url = this.imagesUrl[index])
        this.listToShow = this.resultsListApi;
        // console.log(result.records)
      },
    })
  }

}
