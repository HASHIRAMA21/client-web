import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthenticationService,
    private router:Router) { }

  ngOnInit(): void {
  }
  onLogin(user: { username: string; password: string; }){
    this.authService.login(user.username, user.password);
    if(this.authService.authenticated){
      this.router.navigateByUrl('/projects')
    }
  }


}
