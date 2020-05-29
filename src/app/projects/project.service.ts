import { Injectable } from '@angular/core';

import { Project } from './project.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const GEL_ALL_PROJECTS_API = 'https://api.zeplin.dev/v1/projects';

@Injectable()
export class ProjectService {
  
  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    
    //ToDo: pagination
    const params = [
      'limit=30',
      'offset=0' ];

    return this.http.get(GEL_ALL_PROJECTS_API + '?' + params.join('&'), 
      {headers: { 'accept': 'application/json'}
    })
    .pipe(
      map((res: Project[]) => { 
        console.log('-----getAllProjects - Response: ', res);
        /*if(res.length === 0){
          return this.createStaticData();
        }*/
        return  res}),
      catchError((err: HttpErrorResponse) => {
        console.error('-----ERROR: getAllProjects - ',err);
        const errorMsg: string = this.handleHttpErrorMsg(err);
        throw new Error(errorMsg);
      })
    );
  }

  getProject(id: string): Observable<Project> {
    
    return this.http.get(GEL_ALL_PROJECTS_API + '/' + id, 
      {headers: { 'accept': 'application/json'}
    })
    .pipe(
      map((res: Project) => { 
        console.log('-----getProject - Response: ', res);
        return  res}),
      catchError((err: HttpErrorResponse) => {
        console.error('-----ERROR: getProject - ',err);
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

  // Test data
  createStaticData(): Project[] {
    const poc1 = new Project();
    poc1.id = '5db81e73e1e36ee19f138c1a';
    poc1.name = 'HAL 9000'
    poc1.description = 'UI designs for the onboard computer on the spaceship Discovery 1'
    const poc2 = new Project();
    poc2.id = '5db81e73e1e36ee19f138c1b';
    poc2.name = 'HAL 9001'
    poc2.description = 'HAL 9001'

    return [poc1, poc2]
  }
}
