import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonColorEnum } from '../enums/button-color.enum';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {
  @Input() icon: string = '';
  @Input() loading: boolean = false;
  @Input() enabled: boolean = true;
  @Input() color: ButtonColorEnum = ButtonColorEnum.primary;
  @Input() width: string = '1.5rem';
  @Input() height: string = '1.5rem';

  @Output() clickFunc: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() hoverFunc: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() leaveFunc: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  handleButtonClick(event: MouseEvent) {
    if (!this.loading && this.enabled) {
      this.clickFunc.emit(event);
    }
  }

  handleButtonHover(event: MouseEvent) {
    if (!this.loading && this.enabled) {
      this.hoverFunc.emit(event);
    }
  }

  handleButtonLeave(event: MouseEvent) {
    if (!this.loading && this.enabled) {
      this.leaveFunc.emit(event);
    }
  }
}
