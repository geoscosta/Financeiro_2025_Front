import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonColorEnum } from '../buttons/enums/button-color.enum';
import { IconButtonComponent } from "../buttons/icon-button/icon-button.component";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, IconButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() showModal: boolean = false;
  @Input() title: string = '';
  @Input() includeMain: boolean = true;
  @Input() closeIcon: string = '../../../assets/icons/close.svg';
  @Input() width: string = '';
  @Input() maxWidth: string = '';
  @Input() padding: string = '';
  @Input() footerDisplay: string = '';

  @Output() closeModalFunc: EventEmitter<boolean> = new EventEmitter<boolean>();

  public get ButtonColorEnum() {
    return ButtonColorEnum;
  }

  handleCloseModal() {
    this.closeModalFunc.emit(false);
  }
}
