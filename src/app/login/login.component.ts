import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { CLIENT_ID, STATE, AUTHORIZE_API } from '../shared/generic.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent  implements OnInit {

  isLoading = false;
  error = null;

  constructor(
    private authService: LoginService,
    private activatedRoute: ActivatedRoute,
    private router: Router){}


  ngOnInit() {
      this.activatedRoute.queryParams.subscribe(params => {
          if (params.code) {
              this.performAccessAction(params.code);
          }
      });
  }

  performAccessAction(oauthCode: string) {
    let authObservable: Observable<any>

    this.isLoading = true;
    authObservable = this.authService.oauthLogin(oauthCode, false);  
    authObservable.subscribe(
        respData => {
          this.isLoading = false;
          this.router.navigate(['/projects']);
          console.log(respData);
        },
        errorResp => {
          this.isLoading = false;          
          this.error = errorResp;
          console.log(errorResp);
        }
      );
  }
  
  goToLoginPage(form: NgForm) {    
    if(!form.valid){
      return;
    }
    const params = [
        'response_type=code',
        'client_id=' + CLIENT_ID,
        'state=' + STATE,
        'redirect_uri=' + encodeURIComponent('http://localhost:4200/oauth/callback')
    ];
    window.location.href = AUTHORIZE_API + '?' + params.join('&');
  }

}
