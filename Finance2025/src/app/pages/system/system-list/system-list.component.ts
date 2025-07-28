import { AuthService } from './../../../common/services/auth/auth.service';
import { SystemService } from './../service/system.service';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from '../../../shared/buttons/primary-button/primary-button.component';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GetSystemFilter, GetSystemResponse } from '../service/models/system.service.model';
import { ButtonColorEnum } from '../../../shared/buttons/enums/button-color.enum';
import { SystemListHeaderComponent } from "./system-list-header/system-list-header.component";
import { SystemListItemComponent } from "./system-list-item/system-list-item.component";
import { ISystemItemDTO } from './system-list-item/models/system-list-item.model';
import { finalize } from 'rxjs/internal/operators/finalize';
import { PaginatorComponent } from "../../../shared/paginator/paginator.component";

@Component({
  selector: 'app-system-list',
  standalone: true,
  imports: [CommonModule, PrimaryButtonComponent, SystemListHeaderComponent, SystemListItemComponent, PaginatorComponent],
  templateUrl: './system-list.component.html',
  styleUrl: './system-list.component.scss'
})
export class SystemListComponent {

  constructor(
    private SystemService: SystemService,
    private AuthService: AuthService,
    public router: Router
  ) {}

  @Input() filter!: GetSystemFilter;


  systemList: GetSystemResponse[] = [];
  page: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  isLoading: boolean = false;

  get ButtonColorEnum() {
    return ButtonColorEnum;
  }

  ngOnInit(): void {
    const email = this.AuthService.getUser().email;
    this.filter = {email} as GetSystemFilter;
    this.getAllPaged();
  }

  ngOnChanges() {
    if (this.filter) {
      this.resetPage();
      this.getAllPaged();
    }
  }

  resetPage() {
    this.page = 1;
  }

  getAllPaged() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.clearItems();

    const filters = JSON.parse(JSON.stringify(this.filter));

    // filters.pageNumber = this.page;
    // filters.pageSize = this.pageSize;

    console.log('Filtros enviados:', filters);

    this.SystemService
      .ListaSistemasUsuario(filters)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (data) => {
          console.log('Resposta da API:', data);
          this.setSystemList(data);
          console.log('Lista carregada:', this.systemList);
        },
        error: () => {
          this.clearItems();
        }
      });
  }

  setSystemList(data: GetSystemResponse[]) {
    if (!data?.length) return;

    this.systemList = data.map(item => ({
      id: item.id,
      name: item.name,
      mes: item.mes,
      ano: item.ano,
      diaFechamento: item.diaFechamento,
      gerarCopiaDespesa: item.gerarCopiaDespesa,
      mesCopia: item.mesCopia,
      anoCopia: item.anoCopia,
    }));
  }

  handleSelectPage(index: number) {
    this.page = index;
    this.clearItems();
    this.getAllPaged();
  }

  clearItems() {
    this.systemList = [];
  }

  navigateToNewForm() {
    this.router.navigate(['/system/new']);
  }
}
