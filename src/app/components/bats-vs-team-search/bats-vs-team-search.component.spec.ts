import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatsVsTeamSearchComponent } from './bats-vs-team-search.component';

describe('BatsVsTeamSearchComponent', () => {
  let component: BatsVsTeamSearchComponent;
  let fixture: ComponentFixture<BatsVsTeamSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatsVsTeamSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatsVsTeamSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
