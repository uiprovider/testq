import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCategoryComponent } from './dynamic-category.component';

describe('DynamicCategoryComponent', () => {
  let component: DynamicCategoryComponent;
  let fixture: ComponentFixture<DynamicCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
