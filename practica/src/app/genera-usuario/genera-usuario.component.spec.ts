import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneraUsuarioComponent } from './genera-usuario.component';

describe('GeneraUsuarioComponent', () => {
  let component: GeneraUsuarioComponent;
  let fixture: ComponentFixture<GeneraUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneraUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneraUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
