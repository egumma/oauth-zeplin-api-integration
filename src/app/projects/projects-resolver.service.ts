import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Project } from './project.model';
import { ProjectService } from './project.service';

@Injectable({ providedIn: 'root' })
export class ProjectsResolverService implements Resolve<Project[]> {
  constructor(private projectService: ProjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const projects = [];//ToDo: implementation
    return projects;
  }
}
