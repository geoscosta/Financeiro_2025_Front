import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonColorEnum } from '../buttons/enums/button-color.enum';
import { IconButtonComponent } from "../buttons/icon-button/icon-button.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [IconButtonComponent, CommonModule],
})
export class NavbarComponent implements OnInit {
  public username: string = '';
  public initials: string = '';
  public isUserLogged: boolean = false;
  public showAlterPassModal: boolean = false;
  public showSubmenu: boolean = false;
  public hasSupervisorRole: boolean = false;

  public get ButtonColorEnum() {
    return ButtonColorEnum;
  }

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
  }

  toggleSubmenu() {
    this.showSubmenu = !this.showSubmenu;
  }

  close() {
    this.showSubmenu = false;
  }

  handleNavigateToHome() {
    this.router.navigate(['home']);
    this.showSubmenu = true;
  }

  handleLogout() {
    this.router.navigate(['login']);
    this.showSubmenu = false;
  }

  handleNavigateToSystem() {
    this.router.navigate(['system']);
    this.showSubmenu = false;
  }

  handleNavigateToCategory() {
    this.router.navigate(['category']);
    this.showSubmenu = false;
  }

  handleNavigateToExpense() {
    this.router.navigate(['expense']);
    this.showSubmenu = false;
  }

  handleNavigateToClient() {
    if (this.router.url != '/client') {
      this.router.navigate(['client']);
      this.showSubmenu = false;
    }
  }

  handleNavigateToTranscription() {
    if (this.router.url != '/transcription') {
      this.router.navigate(['transcription']);
      this.showSubmenu = false;
    }
  }

  handleNavigateToDashboard() {
    this.router.navigate(['dashboard']);
    this.showSubmenu = false;
  }

  handleNavigateToKeywordsCloud()
  {
    this.router.navigate(['keywords-cloud']);
    this.showSubmenu = false;
  }

  handleNavigateToSaReport() {
    this.router.navigate(['sa_report']);
    this.showSubmenu = false;
  }

  handleNavigateToCategoryAnalysisReport() {
    this.router.navigate(['category-analysis-report']);
    this.showSubmenu = false;
  }

  handleNavigateToAnalyticalReportReport() {
    this.router.navigate(['analytical-report']);
    this.showSubmenu = false;
  }

  handleAlterPassword() {
    this.showAlterPassModal = true;
  }

  handleShowAlterPasswordModal(state: boolean) {
    this.showAlterPassModal = state;
  }
}
