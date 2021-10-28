import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatsVsTeamDetailsComponent } from './bats-vs-team-details.component';

describe('BatsVsTeamDetailsComponent', () => {
  let component: BatsVsTeamDetailsComponent;
  let fixture: ComponentFixture<BatsVsTeamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatsVsTeamDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatsVsTeamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
