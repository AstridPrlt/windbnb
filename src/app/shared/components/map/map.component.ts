import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { Records } from 'src/app/_models/api-airbnb-results.model';
import { environment } from 'src/environments/environment';
import UnsplashImagesJson from '../../../../assets/unsplashImages.json';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: any;
  imagesUrl: string[] = [];

  @ViewChild("mapbox") mapbox!: ElementRef;

  @Input() mapCenterCoordinates!: [number, number];
  @Input() mapZoom!: number;
  @Input() accCoordinates!: [number, number];
  @Input() records!: Records[];

  constructor(private _renderer: Renderer2) {}

  ngOnInit(): void {
    console.log(this.mapZoom, this.mapCenterCoordinates, this.accCoordinates);
    // this.createMap(this.mapCenterCoordinates, this.mapZoom, this.accCoordinates);
    this.imagesUrl = UnsplashImagesJson.map(i => i.urls.small);
    console.log(this.records);
    this.createMap(this.mapCenterCoordinates, this.mapZoom, this.accCoordinates, this.records);
    this.map.resize();
  }

  ngOnChanges(): void {
    this.createMap(this.mapCenterCoordinates, this.mapZoom, this.accCoordinates, this.records);
    this.map.resize();
  }

  createMap(mapCenterCoordinates: [number, number], mapZoom: number, accCoordinates?: [number, number], records?: Records[]): void {
    mapboxgl.accessToken = environment.mapbox.apiKey;

    this.map = new mapboxgl.Map({
      container: 'mapbox', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: mapCenterCoordinates, // starting position [lng, lat]
      zoom: mapZoom // starting zoom
    });
    this.map.addControl(new mapboxgl.NavigationControl());

    if(accCoordinates && !records) {
      const el: HTMLElement = this._renderer.createElement('div');
      el.classList.add('marker');
      new mapboxgl.Marker(el)
      .setLngLat(accCoordinates)
      .addTo(this.map);
    } else if(records) {
      records.forEach(i => {
          const el: HTMLElement = this._renderer.createElement('div');
          el.classList.add('marker');

          const popup = new mapboxgl.Popup({ offset: 25, anchor: 'left' }).setHTML(
              `<img src="${this.imagesUrl[records.indexOf(i)]}" alt="picture of the home" style="width: 100%; height: 70%;
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

}
