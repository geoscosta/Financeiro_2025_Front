import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonColorEnum } from '../enums/button-color.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-secondary-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './secondary-button.component.html',
  styleUrl: './secondary-button.component.scss'
})
export class SecondaryButtonComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() right: boolean = false;
  @Input() enabled: boolean = true;
  @Input() color: ButtonColorEnum = ButtonColorEnum.primary;
  @Input() widthFull: boolean = false;

  @Output() clickFunc: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  handleButtonClick(event: MouseEvent) {
    if (this.enabled) {
      this.clickFunc.emit(event);
    }
  }
}
