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

  location: HTMLElement | null | undefined;
  guests: HTMLElement | null | undefined;
  searchContainer: HTMLElement | null | undefined;
  isSearchContainerSmall: boolean = true;

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
    this.location = document.getElementById("location");
    this.guests = document.getElementById("guests");
    this.searchContainer = document.getElementById("searchContainer");
  }

  openSearchForm(): void {
    if(this.isSearchContainerSmall) {
      this.searchContainer?.classList.remove('small');
      this.searchContainer?.classList.add('large');
      this.searchContainer != null ? this.searchContainer.style.height = `calc(175px + 35px * ${this.citiesCount})` : 'auto';
      this.isSearchContainerSmall = false;
    }
  }

  closeSearchForm(): void {
    // this.location?.children.item(1)?.classList.add('hide');
    // this.guests?.children.item(1)?.classList.add('hide');
    this.searchContainer?.classList.add('small');
    this.searchContainer?.classList.remove('large');
    this.searchContainer!.style.height = '55px';
    this.isSearchContainerSmall = true;
  }

  toggleActive(field: string): void {
    if(field == "location") {
      this.location?.classList.add('active');
      this.location?.children.item(1)?.classList.remove('hide');
      this.guests?.classList.remove('active');
      this.guests?.children.item(1)?.classList.add('hide');
    } else {
      this.location?.classList.remove('active');
      this.location?.children.item(1)?.classList.add('hide');
      this.guests?.classList.add('active');
      this.guests?.children.item(1)?.classList.remove('hide');
    }
  }

  handleGuestsMinus() {

  }

  handleGuestsPlus() {

  }

  searchSubmit() {

  }
}
