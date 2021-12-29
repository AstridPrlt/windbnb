import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HomeItem } from 'src/app/_models/home-item.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('openCloseSearchForm', [
      state('close', style({
        borderRadius: '16px',
        width: '300px',
        height: '55px'
      })),
      state('open', style({
        borderRadius: '0px',
        width: '100%',
        height: 'calc(175px + 35px * {{citiesCount}})',
      }), {params: {citiesCount: 5}}),
      transition('close <=> open', [
        group([
          query('@showCloseBtn', animateChild()),
          query('.details', [
            style({ opacity: 0 }),
            animate('0.3s 0.4s', style({ opacity: 1 })),
          ]),
          animate('0.5s ease-in-out')
        ]),
      ]),
    ]),

    trigger('showCloseBtn', [
      state('hide', style({
        transform: 'scale(0)'
      })),
      state('show', style({
        transform: 'scale(1)'
      })),
      transition('hide => show', [
        animate('0.4s 0.7s ease-in-out')
      ]),
    ])

  ]
})
export class SearchComponent implements OnInit {
  @Input()
  listAcc!: HomeItem[];

  @Output() toggleSearchFormEvent = new EventEmitter<boolean>();
  @Output() filterAccomodations = new EventEmitter<any>();

  listCities!: string[];
  citiesCount: number = 0;

  isSearchContainerSmall: boolean = true;

  @ViewChild("searchContainer") searchContainer!: ElementRef;
  @ViewChild("location") location!: ElementRef;
  @ViewChild("locationDetails") locationDetails!: ElementRef;
  @ViewChild("guests") guests!: ElementRef;
  @ViewChild("guestsDetails") guestsDetails!: ElementRef;

  searchForm = this.fb.group({
    locationCity: [""],
    guestsAdults: [1, Validators.min(1)],
    guestsChildren: [0]
  })

  constructor(private fb: FormBuilder, private _renderer: Renderer2) { }

  ngOnInit(): void {
    this.listAcc;
    //retrieve list of all cities without doublons :
    this.listCities = [...new Set(this.listAcc.map(x => x.city))];

    this.citiesCount = this.listCities.length;
  }

  openSearchForm(): void {
    if(this.isSearchContainerSmall) {
      this._renderer.removeClass(this.searchContainer.nativeElement, 'small');
      this._renderer.addClass(this.searchContainer.nativeElement, 'large');
      // this._renderer.setStyle(this.searchContainer.nativeElement, 'height', `calc(175px + 35px * ${this.citiesCount})`);
      this.isSearchContainerSmall = false;
      this.toggleSearchFormEvent.emit(this.isSearchContainerSmall); //for darkLayer
    }
  }

  closeSearchForm(): void {
    this._renderer.addClass(this.searchContainer.nativeElement, 'small');
    this._renderer.removeClass(this.searchContainer.nativeElement, 'large');
    // this._renderer.setStyle(this.searchContainer.nativeElement, 'height', '55px');
    this.isSearchContainerSmall = true;
    this.toggleSearchFormEvent.emit(this.isSearchContainerSmall); //for darkLayer
  }

  toggleActive(field: string): void {
    if(field == "location") {
      this._renderer.addClass(this.location.nativeElement, 'active');
      this._renderer.removeClass(this.locationDetails.nativeElement, 'hide');
      this._renderer.removeClass(this.guests.nativeElement, 'active');
      this._renderer.addClass(this.guestsDetails.nativeElement, 'hide');
    } else {
      this._renderer.removeClass(this.location.nativeElement, 'active');
      this._renderer.addClass(this.locationDetails.nativeElement, 'hide');
      this._renderer.addClass(this.guests.nativeElement, 'active');
      this._renderer.removeClass(this.guestsDetails.nativeElement, 'hide');
    }
  }

  chooseCity(city: string): void {
    this.searchForm.patchValue({locationCity: city});
  }
  cancelCity(): void {
    this.searchForm.patchValue({locationCity: ''});
  }

  handleGuestsMinus(adultsOrChildren: string) {
    if(adultsOrChildren == 'guestsAdults') {
      if(this.searchForm.get('guestsAdults')?.value > 1) {
        this.searchForm.patchValue({guestsAdults: this.searchForm.get('guestsAdults')?.value-1})
      }
    }
    if (adultsOrChildren == 'guestsChildren') {
      if (this.searchForm.get('guestsChildren')?.value > 0) {
        this.searchForm.patchValue({guestsChildren: this.searchForm.get('guestsChildren')?.value-1})
      }
    }
  }

  handleGuestsPlus(adultsOrChildren: string) {
    adultsOrChildren == 'guestsAdults' ? this.searchForm.patchValue({guestsAdults: this.searchForm.get('guestsAdults')?.value+1}) : this.searchForm.patchValue({guestsChildren: this.searchForm.get('guestsChildren')?.value+1})
  }

  searchSubmit() {
    let guestsNumber = this.searchForm.get('guestsAdults')?.value + this.searchForm.get('guestsChildren')?.value;
    let filter = [this.searchForm.get('locationCity')?.value, guestsNumber]
    this.filterAccomodations.emit(filter);
    this.closeSearchForm();
  }
}
