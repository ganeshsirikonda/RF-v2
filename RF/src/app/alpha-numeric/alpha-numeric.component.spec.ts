import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphaNumericComponent } from './alpha-numeric.component';

describe('AlphaNumericComponent', () => {
  let component: AlphaNumericComponent;
  let fixture: ComponentFixture<AlphaNumericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlphaNumericComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlphaNumericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
