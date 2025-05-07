import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ButtonColorEnum } from '../buttons/enums/button-color.enum';
import { CardColorEnum } from './enums/card-color.enum';
import { IconButtonComponent } from '../buttons/icon-button/icon-button.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, IconButtonComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({})),
      state('final', style({
        height: '0',
        paddingBottom: '0',
        opacity: '0',
      })),
      transition('initial <=> final', animate('300ms')),
    ]),
  ],
})
export class CardComponent implements OnChanges {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() isOpen: boolean = true;
  @Input() accordion: boolean = true;
  @Input() elevation: boolean = true;
  @Input() color: CardColorEnum = CardColorEnum.common;

  public open: boolean = true;

  public get ButtonColorEnum() { return ButtonColorEnum; }

  ngOnChanges(): void {
    this.open = this.isOpen;
  }

  handleToggleAccordion() {
    this.open = !this.open;
  }
}
