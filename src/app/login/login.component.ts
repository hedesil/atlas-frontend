import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';

interface Credentials {
  username: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit({value}: { value: Credentials }) {
    this.authService.login(value)
      .subscribe((res) => {
        this.setSession(res);
        this.router.navigate(['/dashboard']);
      });
  }

  setSession(token) {
    sessionStorage.setItem('token', token.token);
  }
}
