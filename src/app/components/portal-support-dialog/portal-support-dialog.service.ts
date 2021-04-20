import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortalSupportDialogService {
 private static SF_CASE_URL = '/api/support/v1.0/sf/support';
  constructor(private http: HttpClient) {

  }


  public createNewSupport(ticket) {
   return this.http.post(PortalSupportDialogService.SF_CASE_URL, ticket);
  }
}
