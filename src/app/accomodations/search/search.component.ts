import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HomeItem } from 'src/app/_models/home-item.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input()
  listAcc!: HomeItem[];

  listCities!: string[];
  citiesCount: number = 0;

  searchForm = this.fb.group({
    location: ["All"],
    guestsAdults: ["1"],
    guestsChilds: ["0"]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listAcc;
    //retrieve list of all cities without doublons :
    this.listCities = [...new Set(this.listAcc.map(x => x.city))];
    // this.searchForm;

    this.citiesCount = this.listCities.length;

    const searchContainer = document.getElementById("searchContainer");
    searchContainer != null ? searchContainer.style.height = `calc(175px + 39px * ${this.citiesCount})` : 'auto';
  }

  handleGuestsMinus() {

  }

  handleGuestsPlus() {

  }

  searchSubmit() {

  }
}
