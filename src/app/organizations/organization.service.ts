import { Injectable } from '@angular/core';
import { Organization } from './organization.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const GEL_ORGANIZATIONS_API = 'https://api.zeplin.dev/v1/organizations';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) {}

  getOrganizations(): Observable<Organization[]> {

    return this.http.get(GEL_ORGANIZATIONS_API, 
      {headers: { 'accept': 'application/json'}
    })
    .pipe(
      map((res: Organization[]) => { 
        console.log('-----getOrganizations - Response: ', res);
        /*if(res.length === 0){
          return this.createStaticData();
        }*/
        return  res}),
      catchError((err: HttpErrorResponse) => {
        console.error('-----ERROR: getOrganizations - ',err);
        const errorMsg: string = this.handleHttpErrorMsg(err);
        throw new Error(errorMsg);
      })
    );
  }

  getOrganization(id: string): Observable<Organization> {
    
    return this.http.get(GEL_ORGANIZATIONS_API + '/' + id, 
      {headers: { 'accept': 'application/json'}
    })
    .pipe(
      map((res: Organization) => { 
        console.log('-----getOrganization - Response: ', res);
        return  res}),
      catchError((err: HttpErrorResponse) => {
        console.error('-----ERROR: getOrganization - ',err);
        const errorMsg: string = this.handleHttpErrorMsg(err);
        throw new Error(errorMsg);
      })
    );

  }

  handleHttpErrorMsg( error: HttpErrorResponse): string {
    const errorMsg = 'Problem in Server, please retry or contact your administrator';
    const err = error.error;
    if (err.message) {
      return err.message;
    } else if (error && (error.statusText === 'Unknown Error' || 'Internal Server Error') && error.name === 'HttpErrorResponse') {
        return errorMsg;
    } else {
        return error.message || errorMsg;
    }
  }

  //ToDo: Test data
  createStaticData(): Organization[] {
    const poc1 = new Organization();
    poc1.id = '5d9caaecb4a3fa9b972f86ce';
    poc1.name = 'Acme, Inc.'
    const poc2 = new Organization();
    poc2.id = '5dcbf4cf0dae3223e451991c';
    poc2.name = 'Dunder Mifflin'

    return [poc1, poc2]
  }
}
