import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GetSystemResponse } from '../../service/models/system.service.model';

@Component({
  selector: 'app-system-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-list-item.component.html',
  styleUrl: './system-list-item.component.scss'
})
export class SystemListItemComponent {

  @Input() data!: GetSystemResponse;

  constructor() { }

}
