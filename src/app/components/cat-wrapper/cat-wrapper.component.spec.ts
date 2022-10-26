import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { CatWrapperComponent } from './cat-wrapper.component';

describe('CatWrapperComponent', () => {
  let component: CatWrapperComponent;
  let fixture: ComponentFixture<CatWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatWrapperComponent],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CatWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
