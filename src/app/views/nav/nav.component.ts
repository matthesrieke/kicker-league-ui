import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  onHandset: boolean;

  constructor(private breakpointObserver: BreakpointObserver,
    private auth: AuthService) {}

    ngOnInit() {
      this.isHandset$.subscribe(obs => {
        this.onHandset = obs;
      });
    }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  
}
