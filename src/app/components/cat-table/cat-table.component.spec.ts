import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { CatTableComponent } from './cat-table.component';

describe('CatTableComponent', () => {
  let component: CatTableComponent;
  let fixture: ComponentFixture<CatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatTableComponent],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
