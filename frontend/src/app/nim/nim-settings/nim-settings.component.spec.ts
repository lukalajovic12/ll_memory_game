import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NimSettingsComponent } from './nim-settings.component';

describe('NimSettingsComponent', () => {
  let component: NimSettingsComponent;
  let fixture: ComponentFixture<NimSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NimSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NimSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
