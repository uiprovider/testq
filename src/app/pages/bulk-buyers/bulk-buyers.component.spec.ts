import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkBuyersComponent } from './bulk-buyers.component';

describe('BulkBuyersComponent', () => {
  let component: BulkBuyersComponent;
  let fixture: ComponentFixture<BulkBuyersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkBuyersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkBuyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
