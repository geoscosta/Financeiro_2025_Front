import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonColorEnum } from '../../../shared/buttons/enums/button-color.enum';
import { MaskTypeEnum } from '../../../shared/input/enums/mask-type.enum';
import { InputTypeEnum } from '../../../shared/input/enums/input-type.enum';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from "../../../shared/modal/modal.component";
import { InputComponent } from "../../../shared/input/input.component";
import { SecondaryButtonComponent } from "../../../shared/buttons/secondary-button/secondary-button.component";
import { PrimaryButtonComponent } from "../../../shared/buttons/primary-button/primary-button.component";
import { ModalResponseComponent } from "../../../shared/modal-response/modal-response.component";
import { SystemService } from '../service/system.service';
import { FinancialSystem } from '../service/models/system.service.model';

@Component({
  selector: 'app-system-new',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    InputComponent,
    SecondaryButtonComponent,
    PrimaryButtonComponent,
    ModalResponseComponent,
  ],
  templateUrl: './system-new.component.html',
  styleUrl: './system-new.component.scss',
})
export class SystemNewComponent {
  @Input() showModal: boolean = false;
  // @Output() handleShowModal: EventEmitter<ModalDisplayRefreshModel> =
  //   new EventEmitter<ModalDisplayRefreshModel>();

  public isLoading: boolean = false;
  public error: boolean = false;
  public keywords: string[] = [];
  public form: any;

  //public activeOptions: string[] = ['Ativo', 'Inativo'];
  public showAll: boolean = false;
  public showModalResponse: boolean = false;
  public titleModalResponse: string = '';
  public iconButtonModalResponse: string = '';
  public message: string = '';

  public get ButtonColorEnum() {
    return ButtonColorEnum;
  }
  public get MaskTypeEnum() {
    return MaskTypeEnum;
  }
  public get InputTypeEnum() {
    return InputTypeEnum;
  }

  constructor(
    public formBuilder: FormBuilder,
    public systemService: SystemService,
    //public categoryService: CategoryService,
    public router: Router
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      active: ['', Validators.required],
      keyword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.showModal = true;
  }

  isFormValid() {
    return this.form.valid;
  }

  isFormComplete() {
    return (
      this.form.controls.name.valid
    );
  }

  handleCloseModalResponse() {
    if (this.error == false) this.handleCloseModal();

    this.showModalResponse = false;
  }

  handleCloseModal() {
    this.form.reset();
    this.router.navigate(['/system/']);
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
  }

  handleAddKeyword() {
    const newKeyword = this.form.controls.keyword.value ?? '';

    if (newKeyword.trim() !== '') {
      this.keywords.push(newKeyword);
      this.form.controls.keyword.reset();
    }
  }

  isKeywordValid() {
    return (
      this.form.controls.keyword.valid &&
      !this.keywords.includes(this.form.controls.keyword.value ?? '')
    );
  }

  handleCreateSystem() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.error = false;

    const request: FinancialSystem = {
      Name: this.form.controls.name.value ?? '',
      Id: 0,
      DiaFechamento: 30,
      GerarCopiaDespesa: false,
      Mes: new Date().getMonth() + 1,
      Ano: new Date().getFullYear(),
      MesCopia: 0,
      AnoCopia: 0,
      NomePropriedade: '',
      mensagem: '',
      notificacoes: [],
    };

    this.systemService.AdicionarSistemaFinanceiro(request).subscribe({
      next: (response: any) => {
        const emailUsuario = "teste@teste.com";
        const systemId = response?.result?.id;
        console.log('ID do sistema:', systemId);
        console.log('Email do usuário:', emailUsuario);

        this.systemService
          .CadastrarUsuarioNoSistema(systemId, emailUsuario)
          .subscribe({
            next: () => {
              this.isLoading = false;
              this.titleModalResponse = 'Sistema cadastrado com sucesso';
              this.iconButtonModalResponse = 'assets/icons/success-primary.svg';
              this.message = 'Novo Sistema financeiro adicionado com êxito!';
              this.showModalResponse = true;
              this.form.reset();
            },
            error: (e) => {
              this.isLoading = false;
              this.error = true;
              console.error(e);

              this.titleModalResponse =
                'Ocorreu um erro ao registrar o usuário no sistema';
              this.iconButtonModalResponse = 'assets/icons/error.svg';
              this.showModalResponse = true;

              if (e.error && e.error.includes('usuário já está cadastrado')) {
                this.message = 'Este usuário já está cadastrado neste sistema.';
              } else {
                this.message = 'tente novamente mais tarde.';
              }
            },
          });
      },
      error: (e) => {
        this.isLoading = false;
        this.error = true;
        console.error(e);

        this.titleModalResponse = 'Ocorreu um erro ao registrar o sistema';
        this.iconButtonModalResponse = 'assets/icons/error.svg';
        this.showModalResponse = true;

        if (e.error && e.error.includes('sistema já está cadastrado')) {
          this.message = 'Este sistema já está cadastrado.';
        } else {
          this.message = 'tente novamente mais tarde.';
        }
      },
    });
  }
}
