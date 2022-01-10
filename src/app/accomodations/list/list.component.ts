import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HomeItem } from 'src/app/_models/home-item.model';
import { environment } from 'src/environments/environment';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  @Input()
  list!: HomeItem[];

  map: any;

  @ViewChild("mapbox") mapbox!: ElementRef;
  @ViewChild("homeList") homeList!: ElementRef;

  listOrMap: string = 'list';

  constructor(private _renderer: Renderer2) {}

  ngOnInit(): void {
    console.log(this.list);
    this.createMap();
  }

  toggleTo(format: string) {
    this.listOrMap = format;
    if(format == 'map') {
      this._renderer.setStyle(this.mapbox.nativeElement, 'display', 'block');
      this._renderer.setStyle(this.homeList.nativeElement, 'display', 'none');
      this.map.resize();
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
      center: [0.050628, 49.45], // starting position [lng, lat]
      zoom: 8.5 // starting zoom
    });
    this.map.addControl(new mapboxgl.NavigationControl());

    this.list.forEach(i => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(i.title);
      const marker = new mapboxgl.Marker()
      .setLngLat([i.coord[0], i.coord[1]])
      .setPopup(popup)
      .addTo(this.map);
    }
    );
  }
}
