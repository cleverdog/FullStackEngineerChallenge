import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'PerformanceReview App';
  role: string;
  menus: any;

  constructor(private router: Router) {}

  async ngOnInit() {
    this.router.events
      .pipe(
        filter(event => {
          return event instanceof NavigationStart;
        })
      )
      .subscribe((event: NavigationStart) => {
        if (event.url.startsWith('/admin')) {
          this.role = 'admin';
          this.menus = [
            {
              text: 'employees',
              icon: 'people'
            },
            {
              text: 'reviews',
              icon: 'star'
            }
          ];
        }
        if (event.url.startsWith('/employee')) {
          this.role = 'employee';
          this.menus = [
            {
              text: 'feedbacks'
            }
          ];
        }
      });
  }
}
