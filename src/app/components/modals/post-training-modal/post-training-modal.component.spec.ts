import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTrainingModalComponent } from './post-training-modal.component';

describe('PostTrainingModalComponent', () => {
  let component: PostTrainingModalComponent;
  let fixture: ComponentFixture<PostTrainingModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostTrainingModalComponent]
    });
    fixture = TestBed.createComponent(PostTrainingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
