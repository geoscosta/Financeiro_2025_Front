import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonColorEnum } from '../enums/button-color.enum';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss']
})
export class PrimaryButtonComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() right: boolean = false;
  @Input() widthFull: boolean = false;
  @Input() loading: boolean = false;
  @Input() enabled: boolean = true;
  @Input() color: ButtonColorEnum = ButtonColorEnum.primary;

  @Output() clickFunc: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  handleButtonClick(event: MouseEvent) {
    if (!this.loading && this.enabled) {
      this.clickFunc.emit(event);
    }
  }
}
