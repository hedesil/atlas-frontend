import { Injectable, ɵConsole } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
private subject = new Subject<any>();
  private keepAfterRouterChange : boolean = false;

  constructor(private router : Router) {
      this.router.events.subscribe(event => {
        if ( event instanceof NavigationStart){
          if( this.keepAfterRouterChange ){
            this.keepAfterRouterChange = false;
          }else{
            this.clear()
          }
        }
      })
   }


   getAlert(): Observable<any> {
     return this.subject.asObservable();
   }

   success(message : string, keepAfterRouterChange : boolean = false){
     this.keepAfterRouterChange = keepAfterRouterChange;
     this.subject.next({type : 'success', text : message})
   }

   error(message : string, keepAfterRouterChange : boolean = false){
    this.keepAfterRouterChange = keepAfterRouterChange;
    this.subject.next({type : 'error', text : message})
  }

  clear(){
    this.subject.next()
  }
  


}
