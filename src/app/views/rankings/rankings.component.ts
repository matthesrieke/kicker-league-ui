import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from 'src/app/services/settings.service';
import { Ranking } from 'src/app/model/ranking';
import { PageableResponse } from 'src/app/model/pageable-response';


@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit {

  displayedColumns: string[] = ['rank', 'name', 'points', 'matches'];
  dataSource: Ranking[] = [];

  constructor(private http: HttpClient, private settings: SettingsService) { }

  ngOnInit() {
    this.http.get<PageableResponse<Ranking>>(this.settings.getSettings().restBaseUrl + '/rankings')
      .subscribe((res: PageableResponse<Ranking>) => {
        this.dataSource = res.data;
      });
  }

}
