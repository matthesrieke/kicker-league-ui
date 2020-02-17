import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, combineLatest, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-two-v-two-match',
  templateUrl: './two-v-two-match.component.html',
  styleUrls: ['./two-v-two-match.component.scss']
})
export class TwoVTwoMatchComponent implements OnInit {


  @Input()
  public options: string[] = [];

  @Input()
  players: any;

  @Output()
  public homePlayersSelected = new EventEmitter<string[]>();

  @Output()
  public guestPlayersSelected = new EventEmitter<string[]>();

  homePlayerControl = new FormControl();
  homePlayer2Control = new FormControl();
  guestPlayerControl = new FormControl();
  guestPlayer2Control = new FormControl();

  filteredOptionsHome: Observable<string[]>;
  filteredOptionsHome2: Observable<string[]>;
  filteredOptionsGuest: Observable<string[]>;
  filteredOptionsGuest2: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    this.homePlayerControl.valueChanges.pipe(debounceTime(500)).subscribe(v => this.checkHomePlayers());
    this.homePlayer2Control.valueChanges.pipe(debounceTime(500)).subscribe(v => this.checkHomePlayers());
    this.guestPlayerControl.valueChanges.pipe(debounceTime(500)).subscribe(v => this.checkGuestPlayers());
    this.guestPlayer2Control.valueChanges.pipe(debounceTime(500)).subscribe(v => this.checkGuestPlayers());

    this.updateOptions();
  }

  checkHomePlayers(): void {
    if (this.homePlayerControl.value && this.homePlayer2Control.value) {
      this.homePlayersSelected.emit([this.homePlayerControl.value, this.homePlayer2Control.value]);
    }
  }

  checkGuestPlayers(): void {
    if (this.guestPlayerControl.value && this.guestPlayer2Control.value) {
      this.guestPlayersSelected.emit([this.guestPlayerControl.value, this.guestPlayer2Control.value]);
    }
  }

  updateOptions() {
    this.filteredOptionsHome = this.homePlayerControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice()),
      );

    this.filteredOptionsHome2 = this.homePlayer2Control.valueChanges
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

    this.filteredOptionsGuest2 = this.guestPlayer2Control.valueChanges
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

}
