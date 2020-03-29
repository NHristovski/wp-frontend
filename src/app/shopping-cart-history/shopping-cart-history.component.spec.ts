import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartHistoryComponent } from './shopping-cart-history.component';

describe('ShoppingCartHistoryComponent', () => {
  let component: ShoppingCartHistoryComponent;
  let fixture: ComponentFixture<ShoppingCartHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
