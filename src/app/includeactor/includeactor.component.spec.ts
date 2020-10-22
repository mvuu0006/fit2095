import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludeactorComponent } from './includeactor.component';

describe('IncludeactorComponent', () => {
  let component: IncludeactorComponent;
  let fixture: ComponentFixture<IncludeactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncludeactorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncludeactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
