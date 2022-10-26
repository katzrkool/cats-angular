import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatWrapperComponent } from './cat-wrapper.component';

describe('CatWrapperComponent', () => {
  let component: CatWrapperComponent;
  let fixture: ComponentFixture<CatWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
