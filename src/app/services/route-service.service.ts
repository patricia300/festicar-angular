import { Injectable } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  currentRoute: string = '';

  constructor(private router: Router) {
    router.events.subscribe((evt: Event) => {
      if (evt instanceof NavigationStart) {
        this.currentRoute = evt.url;
        console.log('current route :', this.currentRoute);
      }
    });
  }
}
