import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatsVsbowlComponent } from './bats-vsbowl.component';

describe('BatsVsbowlComponent', () => {
  let component: BatsVsbowlComponent;
  let fixture: ComponentFixture<BatsVsbowlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatsVsbowlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatsVsbowlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
