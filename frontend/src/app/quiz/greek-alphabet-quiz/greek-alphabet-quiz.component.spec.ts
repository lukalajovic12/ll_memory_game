import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreekAlphabetQuizComponent } from './greek-alphabet-quiz.component';

describe('GreekAlphabetQuizComponent', () => {
  let component: GreekAlphabetQuizComponent;
  let fixture: ComponentFixture<GreekAlphabetQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreekAlphabetQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreekAlphabetQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
