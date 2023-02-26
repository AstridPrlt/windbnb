import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HomeItem } from 'src/app/_models/home-item.model';
import { environment } from 'src/environments/environment';
import mapboxgl from 'mapbox-gl';
import { Records } from 'src/app/_models/api-airbnb-results.model';
import UnsplashImagesJson from '../../../assets/unsplashImages.json';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  @Input()
  list!: HomeItem[];
  @Input()
  apiList!: Records[];

  imagesUrl: string[] = [];

  map: any;

  @ViewChild("mapbox") mapbox!: ElementRef;
  @ViewChild("homeList") homeList!: ElementRef;

  listOrMap: string = 'list';

  constructor(private _renderer: Renderer2) {}

  ngOnInit(): void {
    this.imagesUrl = UnsplashImagesJson.map(i => i.urls.small);
    console.log(this.apiList);

  }
  ngOnChanges(): void {
    // this.createMap();
    console.log(this.apiList);
  }

  toggleTo(format: string) {
    this.listOrMap = format;
    if(format == 'map') {
      this._renderer.setStyle(this.mapbox.nativeElement, 'display', 'block');
      this._renderer.setStyle(this.homeList.nativeElement, 'display', 'none');
      // this.map.resize();
    } else {
      this._renderer.setStyle(this.mapbox.nativeElement, 'display', 'none');
      this._renderer.setStyle(this.homeList.nativeElement, 'display', 'flex');
    }
  }

  createMap(): void {
    mapboxgl.accessToken = environment.mapbox.apiKey;

    this.map = new mapboxgl.Map({
      container: 'mapbox', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [2.344075261837547, 48.857990087246385], // starting position [lng, lat]
      zoom: 11 // starting zoom
    });
    this.map.addControl(new mapboxgl.NavigationControl());


    // this.list.forEach(i => {

    //   const el: HTMLElement = this._renderer.createElement('div');
    //   el.classList.add('marker');

    //   const popup = new mapboxgl.Popup({ offset: 25, anchor: 'left' }).setHTML(
    //     `<img src="${i.photo}" alt="picture of the home" style="width: 100%; height: 70%;
    // object-fit: cover;">
    //     <h4>${i.title}</h4>`
    //     );

    //   new mapboxgl.Marker(el)
    //   .setLngLat([i.coord[0], i.coord[1]])
    //   .setPopup(popup)
    //   .addTo(this.map);
    // }
    // );

    this.apiList.forEach(i => {
      const el: HTMLElement = this._renderer.createElement('div');
      el.classList.add('marker');

      const popup = new mapboxgl.Popup({ offset: 25, anchor: 'left' }).setHTML(
        `<img src="${this.imagesUrl[this.apiList.indexOf(i)]}" alt="picture of the home" style="width: 100%; height: 70%;
    object-fit: cover;">
        <h4><a href="accomodations/room/${i.record.id}" target="_blank">${i.record.fields.name}</a></h4>`
        );

      new mapboxgl.Marker(el)
      .setLngLat([i.record.fields.geolocation.lon, i.record.fields.geolocation.lat])
      .setPopup(popup)
      .addTo(this.map);
    }
    );
  }
}
