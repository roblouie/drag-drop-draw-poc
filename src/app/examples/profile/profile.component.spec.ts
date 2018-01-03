import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/user/user.service';
import { BroadcastService } from '../../core/broadcast.service';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';

@Component({
  template: '',
  selector: 'app-profile-image'
})
class StubProfileImageComponent {
  @Input() currentImage: any;
  @Output() imageChanged = new EventEmitter<any>();
}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let userService: UserService;
  let broadcastService: BroadcastService;

  beforeEach(async(() => {

    const userServiceStub: any = {
      getCurrentUser: () => { }
    };

    const broadcastServiceStub: any = { };

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        SharedModule,
        ReactiveFormsModule,
        AngularMaterialModule,
      ],
      declarations: [
        ProfileComponent,
        StubProfileImageComponent
      ],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: BroadcastService, useValue: broadcastServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    userService = TestBed.get(UserService);
    broadcastService = TestBed.get(BroadcastService);
    spyOn(userService, 'getCurrentUser').and.returnValue(Observable.create(o => o.next({ phones: [] })));
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
