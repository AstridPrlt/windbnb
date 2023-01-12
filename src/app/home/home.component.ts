import { Component, OnInit } from '@angular/core';
import { ApiAirbnbResults, Records } from '../_models/api-airbnb-results.model';
import { WindbnbServiceService } from '../_services/windbnb-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  resultsListApi!: Records[];

  constructor(private service: WindbnbServiceService) { }

  ngOnInit(): void {
    this.getAirbnbListingAPI();
  }

  getAirbnbListingAPI(): void {
    this.service.getApiListing().subscribe({
      next: (result: ApiAirbnbResults) => {
        this.resultsListApi = result.records;
        console.log(result.records)
      },
    })
  }

}
