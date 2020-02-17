import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from 'src/app/services/settings.service';
import { Match } from 'src/app/model/match';
import { PageableResponse } from 'src/app/model/pageable-response';


@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  displayedColumns: string[] = ['date', 'match', 'score'];
  dataSource: Match[] = [];

  constructor(private http: HttpClient, private settings: SettingsService) { }

  ngOnInit() {
    this.http.get<PageableResponse<Match>>(this.settings.getSettings().restBaseUrl + '/matches')
      .subscribe((res: PageableResponse<Match>) => {

        res.data.forEach(d => {
          const homeWinner = d.score.home > d.score.guest;

          d.home.forEach(p => p.winner = homeWinner);
          d.guest.forEach(p => p.winner = !homeWinner);
        });

        this.dataSource = res.data;
      });

  }
}
