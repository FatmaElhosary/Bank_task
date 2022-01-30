import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProductimgComponent } from './upload-productimg.component';

describe('UploadProductimgComponent', () => {
  let component: UploadProductimgComponent;
  let fixture: ComponentFixture<UploadProductimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadProductimgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadProductimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
