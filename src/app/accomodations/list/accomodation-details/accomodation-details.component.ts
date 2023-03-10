import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  randomImages: string[] = [];
  imagesForModal: string[] = [];

  showAllPicturesModal: boolean = false;
  showAllAmenitiesModal: boolean = false;

  @ViewChild('modalPictures') modalPictures!: ElementRef;

  constructor(private route: ActivatedRoute, private service: WindbnbServiceService, private _renderer: Renderer2) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    let indexForImage = this.route.snapshot.queryParams['indexImage'];

    this.unsplashImage = UnsplashImagesJson[indexForImage].urls.small;
    this.imagesForModal.push(UnsplashImagesJson[indexForImage].urls.regular);

    this.details$ = this.service.getApiRecordDetails(id);

    console.log(this.details$.subscribe({next: res => console.log(res.record.fields)}));

    this.getRandomImages(6);
  }

  toggleShowAllAmenities(): void {
    this.showAllAmenitiesModal = !this.showAllAmenitiesModal;
  }
  toggleShowAllPictures(): void {
    this.showAllPicturesModal = !this.showAllPicturesModal;
    if(this.showAllPicturesModal) {
      this._renderer.addClass(this.modalPictures.nativeElement, 'modalPicturesOpening');
      this._renderer.removeClass(this.modalPictures.nativeElement, 'modalPicturesClosing')
    } else {
      this._renderer.addClass(this.modalPictures.nativeElement, 'modalPicturesClosing');
      this._renderer.removeClass(this.modalPictures.nativeElement, 'modalPicturesOpening')
    }
  }

  getRandomImages(numberOfImages: number): void {
    let maxNumber = UnsplashImagesJson.length - 1;
    let minNumber = 100;
    let randomNumbers: number[] = [];
    let randomAlreadyExists: boolean;

    for (let index = 0; index < numberOfImages; index++) {
      do {
        let randomNb = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        randomAlreadyExists = randomNumbers.includes(randomNb);
        if(!randomAlreadyExists) {
          randomNumbers.push(randomNb);
          this.randomImages.push(UnsplashImagesJson[randomNb].urls.small);
          this.imagesForModal.push(UnsplashImagesJson[randomNb].urls.regular);
        }
      }
      while(randomAlreadyExists)
    }
  }
}
