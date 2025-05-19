import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemFilterComponent } from "./system-filter/system-filter.component";
import { SystemListComponent } from "./system-list/system-list.component";
import { GetSystemFilter } from './service/models/system.service.model';

@Component({
  selector: 'app-system',
  standalone: true,
  imports: [CommonModule, SystemFilterComponent, SystemListComponent],
  templateUrl: './system.component.html',
  styleUrl: './system.component.scss'
})
export class SystemComponent {
  filter!: GetSystemFilter;

    setFilter(filter: GetSystemFilter) {
      this.filter = filter;
    }
}
