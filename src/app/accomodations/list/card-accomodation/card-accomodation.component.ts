import { Component, Input, Output } from '@angular/core';
import { RecordDetails } from 'src/app/_models/api-airbnb-results.model';

@Component({
  selector: 'app-card-accomodation',
  templateUrl: './card-accomodation.component.html',
  styleUrls: ['./card-accomodation.component.scss']
})
export class CardAccomodationComponent {

  @Input() dataForCard!: RecordDetails;
  @Input() unsplashImage!: string;
  @Input() indexImage!: number;

  @Output() indexForImage!: number;

  ngOnInit(): void {
    // console.log(this.dataForCard);

    this.indexForImage = this.indexImage;
  }
}
