import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparepartTableComponent } from './sparepart-table.component';

describe('SparepartTableComponent', () => {
  let component: SparepartTableComponent;
  let fixture: ComponentFixture<SparepartTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SparepartTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SparepartTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
