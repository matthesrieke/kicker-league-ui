import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  onHandset: boolean;
  username: string;

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService) { }

  ngOnInit() {
    this.isHandset$.subscribe(obs => {
      this.onHandset = obs;
    });
    this.auth.authenticatedStatus.subscribe(v => {
      if (v) {
        this.username = this.auth.user;
      } else {
        delete this.username;
      }
    });
  }
  
  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  
}
