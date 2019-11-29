import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: '',
})
export class LogoutComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
    sessionStorage.setItem('token',undefined)
    this.router.navigate(['login'])
  }

}
