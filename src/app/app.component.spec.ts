// import { TestBed, async } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AppComponent } from './app.component';
// import {ConfigurationAPIService} from "~/services/configuration/configuration-api.service";
// import {HttpClient, HttpHandler} from "@angular/common/http";
// import {IconsService} from "~/services/icons.service";
// import {UserService} from "~/services/user/user.service";
// import {CookiesService} from "~/services/cookies/cookies.service";
// import {GateApiService} from "~/services/gate/gate-api.service";
// import {AccountsService} from "~/services/accounts/accounts.service";
// import {NavigationSetupService} from "~/services/navigation/navigation-setup.service";
// import {AssetUrlPipe} from "~/shared/pipes/assets.pipe";
//
// describe('AppComponent', () => {
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule
//       ],
//       providers: [
//         HttpClient,
//         HttpHandler,
//         ConfigurationAPIService,
//         IconsService,
//         UserService,
//         UserService,
//         CookiesService,
//         GateApiService,
//         AccountsService,
//         NavigationSetupService
//       ],
//       declarations: [
//         AppComponent,
//
//         AssetUrlPipe,
//       ],
//     }).compileComponents();
//   }));
//
//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   });
//
//   it(`should have as title 'navbar'`, () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     console.log('APP', app);
//     expect(app.title).toEqual('navbar');
//   });
//
//   it('should render title in a h1 tag', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('h1').textContent).toContain('Welcome to navbar!');
//   });
// });
