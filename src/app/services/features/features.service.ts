import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

  public static VATBOX_SERVICE_NAME = 'features-service';
  public static FEATURES_URL = `/api/${FeaturesService.VATBOX_SERVICE_NAME}/v1/features`;

  constructor(
    private http: HttpClient
  ) { }

  public getAllFeatures(): Observable<any[]> {
    return this.http.get<any[]>(FeaturesService.FEATURES_URL);
  }
}
