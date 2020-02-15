import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, startWith, combineLatest } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';
import { Match } from 'src/app/model/match';


@Component({
  selector: 'app-submit-match',
  templateUrl: './submit-match.component.html',
  styleUrls: ['./submit-match.component.scss']
})
export class SubmitMatchComponent implements OnInit {

  homePlayerControl = new FormControl();
  guestPlayerControl = new FormControl();
  options: string[] = [];
  players: any;
  filteredOptionsHome: Observable<string[]>;
  filteredOptionsGuest: Observable<string[]>;
  comment: string;
  guestScore: number;
  homeScore: number;
  status: string;

  constructor(private http: HttpClient, private settings: SettingsService) { }

  ngOnInit() {
    this.resolvePlayers();
  }

  resolvePlayers() {
    this.http.get(this.settings.getSettings().restBaseUrl + '/players').subscribe((res: any) => {
      this.players = res.data;
      this.options = res.data.map(p => p.nickName);

      this.updateOptions();
    });
  }

  updateOptions() {
    this.filteredOptionsHome = this.homePlayerControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice()),
      );

    this.filteredOptionsGuest = this.guestPlayerControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  formReady() {
    return this.homeScore >= 0 && this.guestScore >= 0 && !(this.homeScore === 0 && this.guestScore === 0)
      && this.homePlayerControl.value && this.guestPlayerControl.value && !(this.homePlayerControl.value === this.guestPlayerControl.value);
  }

  submitMatch() {
    console.log('comment', this.comment, this.homeScore, this.guestScore);

    const m: Match = {
      dateTime: new Date(),
      home: {
        nickName: this.homePlayerControl.value
      },
      guest: {
        nickName: this.guestPlayerControl.value
      },
      score: {
        home: this.homeScore,
        guest: this.guestScore
      },
      comment: this.comment
    };

    const obs: Observable<any>[] = [];

    if (this.options.indexOf(m.home.nickName) < 0) {
      obs.push(this.registerPlayer(m.home.nickName));
    }

    if (this.options.indexOf(m.guest.nickName) < 0) {
      obs.push(this.registerPlayer(m.guest.nickName));
    }

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
