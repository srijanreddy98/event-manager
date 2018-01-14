import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventWallComponent } from './event-wall.component';

describe('EventWallComponent', () => {
  let component: EventWallComponent;
  let fixture: ComponentFixture<EventWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
