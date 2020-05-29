import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from '../project.model';
import { Subscription } from 'rxjs';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects: Project[];
  subscription: Subscription;
  isLoading = false;
  error = null;


  constructor(private projectService: ProjectService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.refreshProjects();
  }

  refreshProjects() {
    this.error = null;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.isLoading = true;
    this.subscription = this.projectService.getAllProjects().
    subscribe(
      (projects: Project[]) => {
        this.isLoading = false;
        this.projects = projects;
      },
      errorResp => {
        this.isLoading = false;          
        this.error = errorResp;
        console.log(errorResp);
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
