import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {NavigationComponent} from './navigation.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {AssetUrlPipe} from "~/shared/pipes/assets.pipe";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {NavigationSetupService} from "~/services/navigation/navigation-setup.service";
import {GateApiService} from "~/services/gate/gate-api.service";
import {HttpClient} from "@angular/common/http";
import {IconsService} from "~/services/icons.service";
import {AppModule} from "~/app.module";
import {DEFAULT_ACCOUNT_ID} from "~/models/app-config.model";

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatIconModule,
        MatDialogModule,
        MatExpansionModule,
        AppModule,
      ],
      providers: [
        HttpClient,
        NavigationSetupService,
        GateApiService,
        IconsService,
      ],
      declarations: [
        NavigationComponent,
        AssetUrlPipe,
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    const iconsService = TestBed.inject(IconsService);
    iconsService.registerSet();
    fixture.detectChanges();
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  describe('NavigationBar', () => {
    it('should init navigation with data', () => {
      const navigationLinks = fixture.nativeElement.querySelectorAll('.navigation mat-expansion-panel');

      const vatRecoveryItem = component.navigation
        .map(i => i.items)
        /** Next map used instead of flat() */
        .map(i => i[0])
        .find(i => i.display === 'VAT Recovery');

      /** Test that navigation is initialized */
      expect(vatRecoveryItem).toBeTruthy();

      /** Test that links appeared */
      expect(navigationLinks[0].textContent).toContain('VAT Recovery');

    });

    it('should disable not authorized items in navigation', () => {
      const vatRecoveryItem = component.navigation
        .map(i => i.items)
        /** Next map used instead of flat() */
        .map(i => i[0])
        .find(i => i.display === 'VAT Recovery')
        .children.find(i => i.display === 'VAT Recovery Overview');

      const vatRecoveryItemHtml = fixture.nativeElement
        .querySelectorAll('.navigation mat-expansion-panel mat-expansion-panel')[0];

      expect(vatRecoveryItemHtml.className).not.toContain('disabled-nav');

      vatRecoveryItem.isAuthorized = false;
      /** Wait while DOM will be changed */
      fixture.detectChanges();

      expect(vatRecoveryItemHtml.className).toContain('disabled-nav');
    });

    it('should create correct links with account id', () => {
      let invoicesNavItem = Array.from(fixture.nativeElement
        .querySelectorAll('.navigation mat-expansion-panel mat-expansion-panel'))
        .find((i: Element) => i.textContent.includes('Your Invoices')) as Element;
      let invoicesLink = invoicesNavItem.querySelector('a');

      expect(invoicesLink.getAttribute('href')).toBe('/ac/-1/invoices');

      component.accountId = DEFAULT_ACCOUNT_ID;

      fixture.detectChanges();

      expect(invoicesLink.getAttribute('href')).toBe('/ac/9655/invoices');
    });
  });

  describe('NavigationToogle', () => {
    it('should contain toogle element', () => {
      const toogle = fixture.nativeElement.querySelector('.navigation__header mat-icon');
      expect(toogle.getAttribute('ng-reflect-svg-icon')).toBe('app:menu');
    });

    it('on toogle click should trigger the event', () => {
      const button = fixture.nativeElement.querySelector('.navigation__header button');
      spyOn(component.sidenavToggle, 'emit');
      button.click();
      expect(component.sidenavToggle.emit).toHaveBeenCalled();
    });
  });

  describe('VATBox SUPPORT', () => {
    it('should present support button', () => {
      const button = Array.from(fixture.nativeElement.querySelectorAll('.navigation__title a'))
        .find((i: HTMLLinkElement) => i.textContent.toLowerCase().includes('support')) as HTMLLinkElement;
      button.click();

      expect(document.body.querySelector('mat-dialog-container')).toBeTruthy();
    });
  })

});
