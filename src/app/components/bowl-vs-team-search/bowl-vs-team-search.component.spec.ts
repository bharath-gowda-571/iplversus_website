import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlVsTeamSearchComponent } from './bowl-vs-team-search.component';

describe('BowlVsTeamSearchComponent', () => {
  let component: BowlVsTeamSearchComponent;
  let fixture: ComponentFixture<BowlVsTeamSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BowlVsTeamSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BowlVsTeamSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
