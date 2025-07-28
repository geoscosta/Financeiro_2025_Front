import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonColorEnum } from '../../shared/buttons/enums/button-color.enum';
import { CardColorEnum } from '../../shared/card/enums/card-color.enum';
import { InputTypeEnum } from '../../shared/input/enums/input-type.enum';
import { CardComponent } from '../../shared/card/card.component';
import { InputComponent } from '../../shared/input/input.component';
import { PrimaryButtonComponent } from '../../shared/buttons/primary-button/primary-button.component';
import { AuthService } from '../../common/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    InputComponent,
    PrimaryButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: any;
  public isLoading: boolean = false;
  public lostPassword: boolean = false;
  public error: boolean = false;
  public errorMessage: string = '';

  public get ButtonColorEnum() {
    return ButtonColorEnum;
  }
  public get CardColorEnum() {
    return CardColorEnum;
  }
  public get InputTypeEnum() {
    return InputTypeEnum;
  }

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    const route = this.activatedRoute.snapshot.routeConfig?.path;
    if (route?.includes('login/reset-password')) {
      this.lostPassword = true;
    }
  }

  isFormValid() {
    return (
      !!this.form.controls.email.value && !!this.form.controls.password.value
    );
  }

  handleLogin() {
    this.error = false;

    if (!this.isFormValid() || this.isLoading) return;

    this.isLoading = true;

    const credentials = {
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
    };

    this.authService.login(credentials.email, credentials.password)
    .then((sucess: boolean) => {
      if (sucess) {
        // Verifica redirecionamento ou navega para home
                const redirectUrl = this.activatedRoute.snapshot.queryParams['redirect'] || '/home';
                this.router.navigateByUrl(redirectUrl);
            } else {
                this.error = true;
                this.errorMessage = 'Credenciais inválidas';
            }
      })
    .catch((error) => {
      this.error = true;
      this.errorMessage = error.message || 'Erro ao realizar login';
      console.error('Login error details:', error);
            }).finally(() => {
      this.isLoading = false;
    });
  }

  handleLostPassword() {
    this.lostPassword = true;
  }

  handleLoginCallBack(value: boolean) {
    this.lostPassword = !value;
  }
}
