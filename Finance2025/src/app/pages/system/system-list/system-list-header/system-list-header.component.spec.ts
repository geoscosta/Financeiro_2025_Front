import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemListHeaderComponent } from './system-list-header.component';

describe('SystemListHeaderComponent', () => {
  let component: SystemListHeaderComponent;
  let fixture: ComponentFixture<SystemListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemListHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
