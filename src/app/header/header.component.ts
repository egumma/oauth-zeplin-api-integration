import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private loginService: LoginService,
     private router: Router) {}
  
  isAuthenticated: boolean;
  userSubscription: Subscription;

  ngOnInit(){
    this.userSubscription = this.loginService.user.subscribe( user =>{
      this.isAuthenticated = !!user
    });
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/auth']);
  }
  
  /*onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }*/
}
