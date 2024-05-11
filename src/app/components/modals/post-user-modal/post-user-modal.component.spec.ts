import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostUserModalComponent } from './post-user-modal.component';

describe('PostUserModalComponent', () => {
  let component: PostUserModalComponent;
  let fixture: ComponentFixture<PostUserModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostUserModalComponent]
    });
    fixture = TestBed.createComponent(PostUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
