import { Component, OnInit } from '@angular/core';
import { HomeItem } from 'src/app/_models/home-item.model';
import DataJson from '../../assets/stays.json';
import { trigger, state, style, animate, transition } from '@angular/animations';

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

  list: HomeItem[] = DataJson;

  listToShow!: HomeItem[];

  isSearchFormOpened: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.listToShow = this.list;
  }

  searchFormState(event: boolean): void {
    this.isSearchFormOpened = !event;
  }

  filter(cityChosen: string) {
    let filteredList = this.list.filter(c => c.city == cityChosen);
    cityChosen == '' ? this.listToShow = this.list : this.listToShow = filteredList;
  }

}
