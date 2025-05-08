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
//    private msalBroadcastService: MsalBroadcastService,
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // loginDisplay = false;
  // displayedColumns: string[] = ['claim', 'value', 'description'];
  // dataSource: any = [];

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
    const email = this.form.controls.email.value ?? '';
    const password = this.form.controls.password.value ?? '';

    if (!this.isFormValid() || this.isLoading) return;

    this.isLoading = true;

    // Aqui você pode adicionar a lógica de autenticação
    // Simulação de login, você pode substituir pela chamada real à API ou serviço de autenticação
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password123') {
        this.router.navigate(['/home']); // Redireciona após login bem-sucedido
      } else {
        this.error = true; // Exibe erro se as credenciais estiverem erradas
        this.isLoading = false;
      }
    }, 1000);
  }

  handleLostPassword() {
    this.lostPassword = true;
  }

  handleLoginCallBack(value: boolean) {
    this.lostPassword = !value;
  }
}
