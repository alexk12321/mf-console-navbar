import { NavGroups, NavItemIconType } from "~/models/navigation.model";
import { FEATURE_MAP } from "~/services/navigation/features.map";


export const navigationConfiguration: NavGroups = [
  {
    items: [
      {
        display: 'Compliance and VAT',
        icon: {
          path: '/solex',
          type: NavItemIconType.Sprite,
        },
        isAuthorized: false,
        featureId: FEATURE_MAP.COMPLIANCE_AND_VAT,
        children: [
          {
            display: 'Compliance Dashboard',
            url: '/dashboards/compliance',
            isAuthorized: false,
            isExact: true,
            featureId: FEATURE_MAP.COMPLIANCE_DASHBOARD,
            children: [
              {
                display: 'Spend Analytics',
                url: '/dashboards/compliance/analytics/spend',
                isAuthorized: true,
                isExact: true,
                featureId: FEATURE_MAP.COMPLIANCE_DASHBOARD,
              },
              {
                display: 'Transactional VAT',
                url: '/dashboards/compliance/analytics/transactional-vat',
                isAuthorized: true,
                isExact: true,
                featureId: FEATURE_MAP.COMPLIANCE_DASHBOARD,
              },
              {
                display: 'Spend by Vendors',
                url: '/dashboards/vendors',
                isAuthorized: true,
                isExact: true,
                featureId: FEATURE_MAP.COMPLIANCE_DASHBOARD,
              }
            ]
          },
          {
            display: 'VAT Recovery Dashboard',
            url: '/dashboards/vat-recovery',
            isAuthorized: false,
            isExact: false,
            featureId: FEATURE_MAP.VAT_RECOVERY_DASHBOARD,
          },
          {
            display: 'Your Transactions',
            url: '/vat-recovery/invoices',
            isAuthorized: false,
            isExact: false,
            featureId: FEATURE_MAP.YOUR_TRANSACTIONS,
          },
          {
            display: 'Your VAT Files',
            url: '/vat-recovery/reclaims',
            isAuthorized: false,
            featureId: FEATURE_MAP.YOUR_VAT_FILES,
          },
          {
            display: 'Compliance Rules',
            url: '/rules-management',
            isAuthorized: false,
            isExact: true,
            featureId: FEATURE_MAP.RULES_MANAGEMENT,
            // permission: 'rules-management',
            children: [
              {
                display: 'Predefined Rules',
                url: '/rules-management/compliance-config',
                isAuthorized: true,
                isExact: true,
                featureId: FEATURE_MAP.RULES_MANAGEMENT,
              },
              {
                display: 'Your Rules',
                url: '/rules-management/custom-rules',
                isAuthorized: true,
                isExact: true,
                featureId: FEATURE_MAP.RULES_MANAGEMENT,
              },
              {
                display: 'Audit trail',
                url: '/rules-management/audit-trail',
                isAuthorized: true,
                isExact: true,
                featureId: FEATURE_MAP.RULES_MANAGEMENT,
              }
            ]
          }
        ],
      },
    ],
  },
  {
    items: [
      {
        display: 'Account Setup',
        icon: {
          path: 'settings',
          type: NavItemIconType.Inbuilt,
        },
        isAuthorized: false,
        featureId: FEATURE_MAP.ACCOUNT_SETUP,
        children: [
          {
            display: 'Account Overview',
            url: '/account-setup/overview',
            isAuthorized: false,
            isExact: true,
            featureId: FEATURE_MAP.ACCOUNT_OVERVIEW,
            permission: 'view-account-overview',
          },
          {
            display: 'Entities Management',
            icon: {
              path: 'entities-management',
              type: NavItemIconType.Inbuilt,
            },
            url: '/account-setup/entities-management',
            isAuthorized: false,
            featureId: FEATURE_MAP.ENTITIES_MANAGEMENT,
            permission: 'view-entity-list',
          },
          {
            display: 'User Management',
            icon: {
              path: 'user-management',
              type: NavItemIconType.Inbuilt,
            },
            url: '/account-setup/user-management',
            serviceName: 'UserManagement',
            isAuthorized: false,
            featureId: FEATURE_MAP.USER_MANAGEMENT,
            permission: 'manage-users',
          },
          {
            display: 'Admin Settings',
            icon: {
              path: 'admin-settings',
              type: NavItemIconType.Inbuilt,
            },
            url: '/account-setup/admin-settings',
            serviceName: 'AdminSettings',
            isAuthorized: false,
            featureId: FEATURE_MAP.ADMIN_SETTINGS,
            permission: 'manage-admin-settings',
          },
        ],
      },
    ],
  },
];
