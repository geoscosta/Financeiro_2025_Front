import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonColorEnum } from '../buttons/enums/button-color.enum';
import { IconButtonComponent } from "../buttons/icon-button/icon-button.component";

@Component({
  selector: 'app-modal-response',
  standalone: true,
  imports: [CommonModule, IconButtonComponent],
  templateUrl: './modal-response.component.html',
  styleUrl: './modal-response.component.scss'
})
export class ModalResponseComponent {
  @Input() showModal: boolean = false;
  @Input() title: string = '';
  @Input() includeMain: boolean = true;
  @Input() icon: string = '';

  @Output() closeModalFunc: EventEmitter<boolean> = new EventEmitter<boolean>();

  public get ButtonColorEnum() { return ButtonColorEnum; }

  handleCloseModal() {
    this.closeModalFunc.emit(false);
  }
}
