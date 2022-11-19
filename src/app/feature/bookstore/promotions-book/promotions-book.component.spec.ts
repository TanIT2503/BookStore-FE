import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsBookComponent } from './promotions-book.component';

describe('PromotionsBookComponent', () => {
  let component: PromotionsBookComponent;
  let fixture: ComponentFixture<PromotionsBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionsBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionsBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
