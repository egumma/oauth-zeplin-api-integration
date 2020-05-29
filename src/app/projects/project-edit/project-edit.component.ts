import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../project.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from '../project.model';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, OnDestroy {
  id: string;
  editMode = false;
  projectDetails: Project;
  subscription: Subscription;
  error = null;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.projectDetails = this.projectService.createStaticData()[0];
    this.route.params.subscribe((params: Params) => {
      this.editMode = params['id'] != null;
      this.id = params['id'];
      if(this.id){
        this.viewProject(this.id);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  viewProject(id: string){
    this.error = null;
    console.log('viewProject : ', id)
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.projectService.getProject(id).
    subscribe(
      (project: Project) => {
        this.projectDetails = project;
      },
      errorResp => {          
        this.error = errorResp;
        console.log(errorResp);
      }
    );
  }

}
