import { Component, OnInit } from '@angular/core';


import { HomeItem } from 'src/app/_models/home-item.model';
import DataJson from '../../assets/stays.json';

@Component({
  selector: 'app-accomodations',
  templateUrl: './accomodations.component.html',
  styleUrls: ['./accomodations.component.scss']
})
export class AccomodationsComponent implements OnInit {

  list: HomeItem[] = DataJson;

  constructor() { }

  ngOnInit(): void {
  }

}
