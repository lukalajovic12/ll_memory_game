import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTemplateComponent } from './game-template.component';

describe('GameDataComponent', () => {
  let component: GameTemplateComponent;
  let fixture: ComponentFixture<GameTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameTemplateComponent]
    });
    fixture = TestBed.createComponent(GameTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
