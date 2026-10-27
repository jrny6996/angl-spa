import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTCVidSources } from './rtcvid-sources';

describe('RTCVidSources', () => {
  let component: RTCVidSources;
  let fixture: ComponentFixture<RTCVidSources>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RTCVidSources],
    }).compileComponents();

    fixture = TestBed.createComponent(RTCVidSources);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
