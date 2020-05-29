import { Component, OnInit, OnDestroy } from '@angular/core';
import { Organization } from '../organization.model';
import { Subscription } from 'rxjs';
import { OrganizationService } from '../organization.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.css']
})
export class OrganizationEditComponent implements OnInit, OnDestroy {
  id: string;
  editMode = false;
  organizationDetails: Organization;
  subscription: Subscription;
  error = null;

  constructor(
    private orgService: OrganizationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //this.organizationDetails = this.orgService.createStaticData()[0];
    this.route.params.subscribe((params: Params) => {
      this.editMode = params['id'] != null;
      this.id = params['id'];
      if(this.id){
        this.viewOrganization(this.id);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  viewOrganization(id: string){         
    this.error = null;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.orgService.getOrganization(id).
    subscribe(
      (organization: Organization) => {
        this.organizationDetails = organization;
      },
      errorResp => {          
        this.error = errorResp;
        console.log(errorResp);
      }
    );
  }

}
