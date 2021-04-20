import {Injectable} from "@angular/core";
import {
  NavGroup,
  NavGroups,
  NavItem,
} from "~/models/navigation.model";
import {environment} from "../../../environments/environment";
import {navigationConfiguration} from "~/services/navigation/navigation.configuration";
import {FEATURE_MAP} from "~/services/navigation/features.map";

const DISABLED_SERVICES = [
  "recovery",
  "corporateIncomeTax",
  "complianceTrainer",
  "vendorDirect"
];

@Injectable()
export class NavigationSetupService {
  private enabledFeatureIds: string[] = [];
  private permittedFeatures;
  private navigationConfig: NavGroups = navigationConfiguration;

  constructor() {
  }

  public initialize(isAdmin: boolean, availableFeatureIds: string[], allFeaturesList, isSKU2Account = false) {
    // if (!isAdmin) {
      this.permittedFeatures = allFeaturesList.filter(i => availableFeatureIds.includes(i.id.toString()));
      this.enabledFeatureIds = availableFeatureIds || [];
      this.initNavigation(this.navigationConfig, isAdmin, isSKU2Account);
    // }
  }


  public getNavigationConfiguration() {
    return this.navigationConfig;
  }

  public getPermittedFeatures() {
    return this.permittedFeatures;
  }

  /**
   *Loop over the config object and children
   *set the ComplianceAssuranceConfObj
   *set the isAuthorized nav item
   */
  private initNavigation(navigation, isAdmin, isSKU2Account) {

    // Iterate map of navigation, check each item in it for permitted
    navigation.forEach((navGroup: NavGroup) => {
      navGroup.items.forEach((navItem: NavItem) => {

        if (this.enabledFeatureIds.includes(navItem.featureId.toString()) || isAdmin) {
          navItem.isAuthorized = true;
          if (!isSKU2Account && navItem.featureId === FEATURE_MAP.VAT_RECOVERY_DASHBOARD) {
            navItem.isAuthorized = false;
          }

          if (navItem.children && navItem.children.length) {
            navItem.children.forEach((i) => {
              i.isAuthorized = true;
              if (i.featureId === FEATURE_MAP.VAT_RECOVERY_DASHBOARD && !isSKU2Account) {
                i.isAuthorized = false;
              }
            });
          }
        } else if (navItem.children && navItem.children.length) {
          navItem.children.forEach((i) => {
            if (this.enabledFeatureIds.includes(i.featureId.toString()) || isAdmin) {
              i.isAuthorized = true
              navItem.isAuthorized = true;
            }
            if (i.featureId === FEATURE_MAP.VAT_RECOVERY_DASHBOARD && !isSKU2Account) {
              i.isAuthorized = false;
            }
          });
        }
      });
    });
  }
}


