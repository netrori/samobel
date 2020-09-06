import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenagementInterieurComponent } from './amenagement-interieur.component';

describe('AmenagementInterieurComponent', () => {
  let component: AmenagementInterieurComponent;
  let fixture: ComponentFixture<AmenagementInterieurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmenagementInterieurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmenagementInterieurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
