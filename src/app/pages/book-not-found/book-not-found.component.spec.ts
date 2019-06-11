import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookNotFoundComponent } from './book-not-found.component';

describe('BookNotFoundComponent', () => {
  let component: BookNotFoundComponent;
  let fixture: ComponentFixture<BookNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
