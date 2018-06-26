import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";

import { FormsModule } from '@angular/forms';

import { CaptchaComponent } from './captcha.component';
import { CaptchaDataService } from '../captcha-data.service';

describe('CaptchaComponent', () => {
  let component: CaptchaComponent;
  let fixture: ComponentFixture<CaptchaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptchaComponent ],
      providers: [
        CaptchaDataService
      ],

      imports: [
        HttpClientModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
