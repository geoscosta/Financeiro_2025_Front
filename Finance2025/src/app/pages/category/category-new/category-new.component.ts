import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { ButtonColorEnum } from '../../../shared/buttons/enums/button-color.enum';
import { MaskTypeEnum } from '../../../shared/input/enums/mask-type.enum';
import { InputTypeEnum } from '../../../shared/input/enums/input-type.enum';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from "../../../shared/modal/modal.component";
import { InputComponent } from "../../../shared/input/input.component";
import { PrimaryButtonComponent } from "../../../shared/buttons/primary-button/primary-button.component";
import { SecondaryButtonComponent } from "../../../shared/buttons/secondary-button/secondary-button.component";
import { ModalResponseComponent } from "../../../shared/modal-response/modal-response.component";
import { SelectComponent } from "../../../shared/select/select.component";

@Component({
  selector: 'app-category-new',
  standalone: true,
  imports: [CommonModule, ModalComponent, InputComponent, PrimaryButtonComponent, SecondaryButtonComponent, ModalResponseComponent, SelectComponent],
  templateUrl: './category-new.component.html',
  styleUrl: './category-new.component.scss'
})
export class CategoryNewComponent {
  @Input() showModal: boolean = false;
  // @Output() handleShowModal: EventEmitter<ModalDisplayRefreshModel> =
  //   new EventEmitter<ModalDisplayRefreshModel>();

  public isLoading: boolean = false;
  public error: boolean = false;
  public keywords: string[] = [];
  public form: any;


  //public activeOptions: string[] = ['Ativo', 'Inativo'];
  //public textareaContent: string = '';
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
    //public categoryService: CategoryService,
    public router: Router
  )
  {
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
      this.form.controls.name.valid &&
      this.form.controls.active.valid &&
      this.keywords.length > 0
    );
  }

  handleCloseModalResponse() {
    if (this.error == false) this.handleCloseModal();

    this.showModalResponse = false;
  }

  handleCloseModal() {
    this.form.reset();
    this.router.navigate(['/category/']);
  }

  // showSeeAllButton(): boolean {
  //   return !this.showAll && this.keywords.length > MAX_WORDS_TO_SHOW;
  // }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
  }

  handleAddKeyword() {
    const newKeyword = this.form.controls.keyword.value ?? '';

    if (newKeyword.trim() !== '') {
      this.keywords.push(newKeyword);
      this.form.controls.keyword.reset();
      //this.updateKeywordTextarea();
    }
  }

  // updateKeywordTextarea() {
  //   if (this.keywords.length <= MAX_WORDS_TO_SHOW || this.showAll)
  //     this.textareaContent = this.keywords.join(' ');
  // }

  // visibleKeywords(): string[] {
  //   if (this.showAll) return this.keywords;
  //   else return this.keywords.slice(0, MAX_WORDS_TO_SHOW);
  // }

  // removeKeyword(index: number) {
  //   this.keywords.splice(index, 1);
  //   this.updateKeywordTextarea();

  //   if (this.keywords.length <= MAX_WORDS_TO_SHOW) this.showAll = false;
  // }

  isKeywordValid() {
    return (
      this.form.controls.keyword.valid &&
      !this.keywords.includes(this.form.controls.keyword.value ?? '')
    );
  }

  // handleCreateCategory() {
  //   if (this.isLoading) return;

  //   this.isLoading = true;
  //   this.error = false;

  //   var request = {
  //     name: this.form.controls.name.value ?? '',
  //     active: this.form.controls.active.value === 'Ativo' ? true : false,
  //     keywords: this.keywords.map((description) => ({
  //       description,
  //       active: this.form.controls.active.value === 'Ativo' ? true : false,
  //     })),
  //   } as CreateCategoryRequest;

    // this.categoryService.createCategory(request).subscribe({
    //   next: () => {
    //     this.isLoading = false;
    //     this.titleModalResponse = 'Nova categoria registrada com sucesso!';
    //     this.iconButtonModalResponse = 'assets/icons/success-primary.svg';
    //     this.message = 'nova categoria foi adicionada ao sistema com êxito.';
    //     this.showModalResponse = true;
    //     this.form.reset();
    //   },
    //   error: (e) => {
    //     this.isLoading = false;
    //     this.error = true;
    //     console.error(e);

    //     this.titleModalResponse = 'Ocorreu um erro ao registrar a categoria';
    //     this.iconButtonModalResponse = 'assets/icons/error.svg';
    //     this.showModalResponse = true;

    //     if (e.error && e.error.includes('categoria já está cadastrada')) this.message = 'Esta categoria já está cadastrada.';
    //     else this.message = 'tente novamente mais tarde.';
    //   },
    // });
  }
