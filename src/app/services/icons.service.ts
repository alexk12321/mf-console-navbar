import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {assetUrl} from '../../single-spa/asset-url';
import {MatIconRegistry} from '@angular/material/icon';

@Injectable()
export class IconsService {
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {}

  public registerSet(): void {
    this.iconRegistry.addSvgIconSetInNamespace(
      'app',
      this.sanitizer.bypassSecurityTrustResourceUrl(assetUrl('images/icons.svg')),
    );
  }
}
