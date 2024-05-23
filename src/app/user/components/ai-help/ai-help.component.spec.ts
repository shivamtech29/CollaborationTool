import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiHelpComponent } from './ai-help.component';

describe('AiHelpComponent', () => {
  let component: AiHelpComponent;
  let fixture: ComponentFixture<AiHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AiHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
