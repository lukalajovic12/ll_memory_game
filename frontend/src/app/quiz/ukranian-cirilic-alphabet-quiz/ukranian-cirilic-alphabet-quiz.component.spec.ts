import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkranianCirilicAlphabetQuizComponent } from './ukranian-cirilic-alphabet-quiz.component';

describe('UkranianCirilicAlphabetQuizComponent', () => {
  let component: UkranianCirilicAlphabetQuizComponent;
  let fixture: ComponentFixture<UkranianCirilicAlphabetQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UkranianCirilicAlphabetQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UkranianCirilicAlphabetQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
