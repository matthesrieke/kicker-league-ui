import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoVTwoMatchComponent } from './two-v-two-match.component';

describe('TwoVTwoMatchComponent', () => {
  let component: TwoVTwoMatchComponent;
  let fixture: ComponentFixture<TwoVTwoMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoVTwoMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoVTwoMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
