import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiAirbnbResults, RecordDetails, Records } from '../_models/api-airbnb-results.model';

@Injectable({
  providedIn: 'root'
})
export class WindbnbServiceService {
  apiUrl: string = "https://public.opendatasoft.com/api/v2/catalog/datasets/airbnb-listings/records";

  // apiUrl: string = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&facet=host_response_time&facet=host_response_rate&facet=host_verifications&facet=city&facet=country&facet=property_type&facet=room_type&facet=bed_type&facet=amenities&facet=availability_365&facet=cancellation_policy&facet=features&geofilter.distance=48.86322990687299%2C+2.347318999522323%2C+50000";

  constructor(private http: HttpClient) { }

  getApiListing(): Observable<ApiAirbnbResults> {
    return this.http.get<ApiAirbnbResults>(`${this.apiUrl}?where=city+like+%22paris%22&limit=100&offset=0&timezone=UTC&include_app_metas=False`);
  }

  getApiRecordDetails(id: string): Observable<Records> {
    return this.http.get<Records>(`${this.apiUrl}/${id}`);
  }
}
