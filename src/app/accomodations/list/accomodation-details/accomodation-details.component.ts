import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Observable } from 'rxjs';
import { RecordDetails, Records } from 'src/app/_models/api-airbnb-results.model';
import { WindbnbServiceService } from 'src/app/_services/windbnb-service.service';
import UnsplashImagesJson from '../../../../assets/unsplashImages.json';

@Component({
  selector: 'app-accomodation-details',
  templateUrl: './accomodation-details.component.html',
  styleUrls: ['./accomodation-details.component.scss']
})
export class AccomodationDetailsComponent implements OnInit {
  details$!: Observable<Records>;
  unsplashImage!: string;

  showAllAmenities: boolean = false;

  constructor(private route: ActivatedRoute, private service: WindbnbServiceService) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    let indexForImage = this.route.snapshot.queryParams['indexImage'];

    this.unsplashImage = UnsplashImagesJson[indexForImage].urls.small;

    this.details$ = this.service.getApiRecordDetails(id);

    console.log(this.details$.subscribe({next: res => console.log(res.record.fields)}));
  }

  toggleShowAllAmenities(): void {
    this.showAllAmenities = !this.showAllAmenities;
  }
}
