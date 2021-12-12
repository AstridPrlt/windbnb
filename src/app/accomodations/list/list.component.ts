import { Component, Input, OnInit } from '@angular/core';
import { HomeItem } from 'src/app/_models/home-item.model';
import DataJson from '../../../assets/stays.json';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  // list: HomeItem[] = DataJson;

  // list: HomeItem[] = DataJson;
  @Input()
  list!: HomeItem[];

  constructor() { }

  ngOnInit(): void {
  }

}
