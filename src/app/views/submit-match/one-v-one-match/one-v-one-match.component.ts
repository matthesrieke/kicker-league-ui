import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, combineLatest, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-one-v-one-match',
  templateUrl: './one-v-one-match.component.html',
  styleUrls: ['./one-v-one-match.component.scss']
})
export class OneVOneMatchComponent implements OnInit {

  @Input()
  public options: string[] = [];

  @Input()
  players: any;

  @Output()
  public homePlayersSelected = new EventEmitter<string[]>();

  @Output()
  public guestPlayersSelected = new EventEmitter<string[]>();

  homePlayerControl = new FormControl();
  guestPlayerControl = new FormControl();

  filteredOptionsHome: Observable<string[]>;
  filteredOptionsGuest: Observable<string[]>;

  constructor() { }

  ngOnInit() {

    this.homePlayerControl.valueChanges.pipe(debounceTime(500)).subscribe(v => this.homePlayersSelected.emit([v]));
    this.guestPlayerControl.valueChanges.pipe(debounceTime(500)).subscribe(v => this.guestPlayersSelected.emit([v]));

    this.updateOptions();
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

}
