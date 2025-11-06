import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericImageUploadComponent } from './generic-image-upload.component';

describe('GenericImageUploadComponent', () => {
  let component: GenericImageUploadComponent;
  let fixture: ComponentFixture<GenericImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericImageUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
