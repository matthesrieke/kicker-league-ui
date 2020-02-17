import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';
import { Match } from 'src/app/model/match';


@Component({
  selector: 'app-submit-match',
  templateUrl: './submit-match.component.html',
  styleUrls: ['./submit-match.component.scss']
})
export class SubmitMatchComponent implements OnInit {

  comment: string;
  guestScore: number;
  homeScore: number;
  status: string;
  players: any;
  options: any;
  homePlayers: any;
  guestPlayers: any;

  constructor(private http: HttpClient, private settings: SettingsService) { }

  ngOnInit() {
    this.resolvePlayers();
  }

  resolvePlayers() {
    this.http.get(this.settings.getSettings().restBaseUrl + '/players?size=1000').subscribe((res: any) => {
      this.players = res.data;
      this.options = res.data.map(p => p.nickName);
    });
  }

  onHomePlayersChanged(ev: any) {
    this.homePlayers = ev;
  }

  onGuestPlayersChanged(ev: any) {
    this.guestPlayers = ev;
  }

  formReady() {
    const ready = this.homeScore >= 0 && this.guestScore >= 0 && !(this.homeScore === 0 && this.guestScore === 0)
      && this.homePlayers && this.guestPlayers;
    return ready;
  }

  submitMatch() {

    const m: Match = {
      dateTime: new Date(),
      home: this.homePlayers.map(s => { return { nickName: s }; }),
      guest: this.guestPlayers.map(s => { return { nickName: s }; }),
      score: {
        home: this.homeScore,
        guest: this.guestScore
      },
      comment: this.comment
    };

    const obs: Observable<any>[] = [];

    // check for not registered players
    m.home.forEach(p => {
      if (this.options.indexOf(p.nickName) < 0) {
        obs.push(this.registerPlayer(p.nickName));
      }
    });

    m.guest.forEach(p => {
      if (this.options.indexOf(p.nickName) < 0) {
        obs.push(this.registerPlayer(p.nickName));
      }
    });

    if (obs.length) {
      forkJoin(obs).subscribe(allDone => {
        this.finalSubmit(m);
        this.resolvePlayers();
      }, err => {
        this.status = 'error';
        console.warn(err);
      });
    } else {
      this.finalSubmit(m);
    }


  }

  registerPlayer(nickName: string): Observable<any> {
    const p: Player = {
      nickName: nickName
    }
    return this.http.post(this.settings.getSettings().restBaseUrl + '/players', p);
  }

  private finalSubmit(m: Match) {
    this.status = 'submitting';
    this.http.post(this.settings.getSettings().restBaseUrl + '/matches', m).subscribe(res => {
      this.status = 'submitted';
    }, err => {
      this.status = 'error';
      console.warn(err);
    })
  }

}
