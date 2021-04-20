import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {NavGroups, NavItem} from '~/models/navigation.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import {NavigationSetupService} from "~/services/navigation/navigation-setup.service";
import {ACCOUNT_PREFIX_IN_URL} from "~/models/app-config.model";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(-90deg)'})),
      state('expanded', style({transform: 'rotate(0deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)'),
      ),
    ]),
  ],
})
export class NavigationComponent implements OnInit {
  private _sidenavColor;

  public navigation: NavGroups = [];
  public expanded: boolean;
  public clickButton: boolean = false;
  public activeLinkColor: string;

  @Input()
  public accountId = -1;
  @Input()
  public currentUserIsAdmin = false;
  @Input()
  public set sidenavColor(color) {
    this._sidenavColor = color;
    this.activeLinkColor = this.lightenDarkenColor(color, 40);
  }
  @Output()
  public sidenavToggle = new EventEmitter<void>();

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private navigationSetupService: NavigationSetupService
  ) {
  }

  public get sidenavColor() {
    return this._sidenavColor;
  }

  public ngOnInit(): void {
    this.navigation = this.navigationSetupService.getNavigationConfiguration();
  }

  public onSidenavToggle(): void {
    this.sidenavToggle.emit();
  }

  public generateUrl(navItem) {
    return `${this.accIdPrefixInUrl}${navItem.url}`;
  }

  public isRouterActive(navItem: NavItem): boolean {
    const url = `/${this.generateUrl(navItem)}`;
    return navItem.isExact ? this.router.url === url : this.router.url.startsWith(url);
  }

  private get accIdPrefixInUrl() {
    return `${ACCOUNT_PREFIX_IN_URL}/${this.accountId}`;
  }

  public itemIsDisplayable(item) {
    return !(item.isForAdminOnly && !this.currentUserIsAdmin);
  }

  public expandActiveMenu(parentItem: NavItem): boolean {
    parentItem.isExpanded = false;
    if (parentItem.children && parentItem.children.length) {
      parentItem.children.map((childItem) => {
        if (this.isRouterActive(childItem)) {
          parentItem.isExpanded = true;
        }
        if (childItem.children) {
          if (childItem.isExpanded) {
            parentItem.isExpanded = true;
          }
          this.expandActiveMenu(childItem);
        }
      });
    }
    return parentItem.isExpanded;
  }

  private lightenDarkenColor(col, amt) {
    let usePound = false;

    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }

    const num = parseInt(col,16);

    let r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    let b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    let g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  }
}
