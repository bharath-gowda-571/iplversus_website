import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlVsTeamDetailsComponent } from './bowl-vs-team-details.component';

describe('BowlVsTeamDetailsComponent', () => {
  let component: BowlVsTeamDetailsComponent;
  let fixture: ComponentFixture<BowlVsTeamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BowlVsTeamDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BowlVsTeamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
