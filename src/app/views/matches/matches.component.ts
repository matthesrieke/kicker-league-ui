import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from 'src/app/services/settings.service';
import { Match } from 'src/app/model/match';
import { PageableResponse } from 'src/app/model/pageable-response';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  displayedColumns: string[] = ['date', 'match', 'score', 'delete'];
  dataSource: Match[] = [];

  constructor(private http: HttpClient, private settings: SettingsService, private auth: AuthService) { }

  ngOnInit() {
    this.retrieveMatches();
  }
  
  retrieveMatches() {
    this.http.get<PageableResponse<Match>>(this.settings.getSettings().restBaseUrl + '/matches')
      .subscribe((res: PageableResponse<Match>) => {

        res.data.forEach(d => {
          const homeWinner = d.score.home > d.score.guest;

          d.home.forEach(p => p.winner = homeWinner);
          d.guest.forEach(p => p.winner = !homeWinner);
        });

        this.dataSource = res.data;
      });

      if (this.auth.isAuthenticated()) {
        this.displayedColumns = ['date', 'match', 'score', 'delete'];
      } else {
        this.displayedColumns = ['date', 'match', 'score'];
      }

      this.auth.authenticatedStatus.subscribe(v => {
        if (this.auth.isAuthenticated()) {
          this.displayedColumns = ['date', 'match', 'score', 'delete'];
        } else {
          this.displayedColumns = ['date', 'match', 'score'];
        }
      });
  }

  deleteMatch(m: Match) {
    this.http.delete(this.settings.getSettings().restBaseUrl + '/matches/' + m.id).subscribe((res: any) => {
      console.log('match removed', m.id);
      this.retrieveMatches();
    }, err => {
      console.warn(err);
    });
  }
}
