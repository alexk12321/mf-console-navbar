import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import {PortalSupportDialogService} from '../portal-support-dialog/portal-support-dialog.service';
import {User} from "~/models/user.model";
import {SnackbarComponent} from "~/components/snack-bar/snack-bar.component";

const supportSubjects = [
  {
    name: 'Portal Interface',
    subSubjects: [],
  },
  {
    name: 'Data',
    subSubjects: ['Suspected error in an invoice', 'Suspected error in a reclaim', 'Suspected error in a data file'],
  },
  {
    name: 'Billing',
    subSubjects: ['Unclear charge', 'Unclear fee calculation'],
  },
  {
    name: 'Access / Permissions',
    subSubjects: ['Create / delete user', 'Permissions management'],
  },
  {
    name: 'Account Settings',
    subSubjects: ['Account onboarding', 'Legal documents'],
  },
  {
    name: 'Other',
    subSubjects: [],
  },
];

@Component({
  selector: 'app-support',
  templateUrl: './portal-support-dialog.component.html',
  styleUrls: ['./portal-support-dialog.component.scss'],
})

export class PortalSupportDialogComponent implements OnInit {
  public supportForm: FormGroup;
  // public isMsg: boolean = false;
  public supportSubjects = supportSubjects;
  public SubSubjectsOptions;
  @ViewChild('subSubjectEl', {read: ElementRef}) public subSubjectEl: ElementRef;
  public defaultSelectOption = '--- Select option ---';
  public user: User;

  // Map to SF the selected categories and sub-categories
  public mappingToSF = {
    // Map to category
    'Portal Interface': 'Service request',
    'Data': 'Processing Quality',
    'Billing': 'Billing',
    'Access / Permissions': 'Access / Permissions',
    'Account Settings': 'OnBoarding & Documentation',
    'Other': 'Other',

    // Map to sub category
    'Portal InterfaceSub': 'Portal functionality',
    'Suspected error in an invoice': 'Unclear invoice',
    'Suspected error in a reclaim': 'Reclaim amount',
    'Suspected error in a data file': 'Errors in DVR data file',
    'Unclear charge': 'Unclear charges',
    'Unclear fee calculation': 'Calculation errors',
    'Create / delete user': 'Create / delete user',
    'Permissions management': 'Change permission',
    'Account onboarding': 'Account Setup issue',
    'Legal documents': 'Reclaim documentation(POA, Delegation)',
    'OtherSub': 'Other',
  };

  constructor(
    private formBuilder: FormBuilder,
    private portalSupportDialogService: PortalSupportDialogService,
    private snackBar: MatSnackBar,
  ) {}

  public ngOnInit() {
    this.supportForm = this.formBuilder.group({
      email: [{value: null, disabled: true}],
      subject: [null, Validators.required],
      subSubject: [{value: null, disabled: true}, [Validators.required]],
      description: ['', Validators.required],
    });
  }

  public selectSubject(subject) {
    this.SubSubjectsOptions = [this.defaultSelectOption, ...subject.subSubjects];
    // check if category have sub-subjects
    if (subject.subSubjects.length > 0)
      this.supportForm.controls['subSubject'].enable();
    else
      this.supportForm.controls['subSubject'].disable();

    if (this.SubSubjectsOptions.length === 2) {
      this.supportForm.controls['subSubject'].setValue(this.SubSubjectsOptions[1]);
    } else {
      this.supportForm.controls['subSubject'].setValue(this.SubSubjectsOptions[0]);
    }
    this.subSubjectEl.nativeElement.focus();
  }


  public onSubmit(value) {

    const supportInfo = {
      email: this.user.email,
      url: window.location.href,
      subject: this.mappingToSF[value.subject.name],
      subsubject: value.subSubject ? this.mappingToSF[value.subSubject] : this.mappingToSF[value.subject.name + 'Sub'],
      description: value.description,
    };


    this.portalSupportDialogService.createNewSupport(supportInfo).subscribe(
      () => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: 4000,
          // here specify the position
          verticalPosition: 'top',
          panelClass: ['default-snackbar'],
          data: {
            html: '<b>Thank you for contacting us.</b><br> Your message has been successfully sent. We will contact you very soon!',
            snackType: 'Success',
            buttonMessage: '',
          },
        });
      },
      error => {
        console.error('SF error', error);
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: 3000,
          // here specify the position
          verticalPosition: 'top',
          panelClass: ['warning-snackbar'],
          data: {html: 'Something went wrong :(', snackType: 'Warn', buttonMessage: ''},
        });
      },
    );
  }
}
