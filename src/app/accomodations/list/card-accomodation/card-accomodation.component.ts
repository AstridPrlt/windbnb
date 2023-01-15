import { Component, Input } from '@angular/core';
import { Record } from 'src/app/_models/api-airbnb-results.model';

@Component({
  selector: 'app-card-accomodation',
  templateUrl: './card-accomodation.component.html',
  styleUrls: ['./card-accomodation.component.scss']
})
export class CardAccomodationComponent {

  @Input() dataForCard!: Record;
  @Input() unsplashImage!: string;

  ngOnInit(): void {
    console.log(this.dataForCard);
  }
}
