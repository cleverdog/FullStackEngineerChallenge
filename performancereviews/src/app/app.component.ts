import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  async ngOnInit() {}
}
