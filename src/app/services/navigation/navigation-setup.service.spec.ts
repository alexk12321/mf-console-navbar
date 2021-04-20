import {GateApiService} from '~/services/gate/gate-api.service';
import {NavigationSetupService} from './navigation-setup.service';
import {inject, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

fdescribe('NavigationSetupService', () => {
  let navigationSetupService: NavigationSetupService;
  let httpTestingController: HttpTestingController;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GateApiService, NavigationSetupService],
    });

    navigationSetupService = TestBed.inject(NavigationSetupService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('getNavigationConfiguration', () => {
    let configuration;

    beforeEach(() => {
      spyOn<any>(navigationSetupService, 'isInDevEnv').and.returnValue(false);

      navigationSetupService.initialize(['Optimise Recovery/Need More Info']);

      configuration = navigationSetupService.getNavigationConfiguration();
    });

    // it('should return all sections', () => {
    //   const sections = configuration.map(i => i.items).flat().map(i => i.display);
    //
    //   expect(sections).toContain('VAT Recovery');
    //   expect(sections).toContain('Optimise Recovery');
    //   expect(sections).toContain('NMI Admin');
    //   expect(sections).toContain('Benefit in Kind');
    //   expect(sections).toContain('Corporate Income Tax');
    //   expect(sections).toContain('Vendor Direct');
    //   expect(sections).toContain('Account Settings');
    // });
    //
    // it('should disable nmiAdmin', () => {
    //   const item = configuration.map(i => i.items).flat().find(i => i.display === 'NMI Admin');
    //   expect(item.isAuthorized).toBe(false);
    // });
    //
    // it('should disable BIK', () => {
    //   const item = configuration.map(i => i.items).flat().find(i => i.display === 'Benefit in Kind');
    //   expect(item.isAuthorized).toBe(false);
    // });
    //
    // fit('should disable TaxTailor', () => {
    //   const item = configuration.map(i => i.items).flat().find(i => i.display === 'Optimise Recovery');
    //   expect(item.children.find(i => i.display === 'Tax Tailor').isAuthorized).toBe(false);
    // });
    //
    // it('should enable NMI', () => {
    //   const item = configuration.map(i => i.items).flat().find(i => i.display === 'Optimise Recovery');
    //   expect(item.children.find(i => i.serviceName === 'nmi').isAuthorized).toBe(true);
    // });
  });

});


