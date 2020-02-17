import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneVOneMatchComponent } from './one-v-one-match.component';

describe('OneVOneMatchComponent', () => {
  let component: OneVOneMatchComponent;
  let fixture: ComponentFixture<OneVOneMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneVOneMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneVOneMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
