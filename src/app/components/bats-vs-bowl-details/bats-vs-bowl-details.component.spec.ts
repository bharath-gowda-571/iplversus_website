import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatsVsBowlDetailsComponent } from './bats-vs-bowl-details.component';

describe('BatsVsBowlDetailsComponent', () => {
  let component: BatsVsBowlDetailsComponent;
  let fixture: ComponentFixture<BatsVsBowlDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatsVsBowlDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatsVsBowlDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
