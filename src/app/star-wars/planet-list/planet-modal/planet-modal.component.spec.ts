import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetModalComponent } from './planet-modal.component';

describe('PlanetModalComponent', () => {
  let component: PlanetModalComponent;
  let fixture: ComponentFixture<PlanetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanetModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
