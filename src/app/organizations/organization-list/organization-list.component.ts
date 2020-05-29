import { Component, OnInit, OnDestroy } from '@angular/core';
import { Organization } from '../organization.model';
import { Subscription } from 'rxjs';
import { OrganizationService } from '../organization.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent implements OnInit, OnDestroy {
  organizations: Organization[];
  subscription: Subscription;
  isLoading = false;
  error = null;

  constructor(private orgService: OrganizationService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.refreshOrganizations();
  }

  refreshOrganizations() {
    this.error = null;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.isLoading = true;
    this.subscription = this.orgService.getOrganizations().
    subscribe(
      (organizations: Organization[]) => {
        this.isLoading = false;
        this.organizations = organizations;
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
