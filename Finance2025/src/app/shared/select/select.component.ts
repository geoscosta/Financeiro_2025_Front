import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputComponent } from "../input/input.component";

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, InputComponent],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() control = new FormControl('');
  @Input() options: string[] = [];
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() errorMessage: string = '';
  @Input() error: boolean = false;
  @Input() disabled: boolean = false;
  @Input() width: string = '';
  @Input() maxOptionsHeight: string = '13rem';
  @Input() isSearch: boolean = false;
  @Input() loading: boolean = false;

  filterOptions: string[] = [];
  focused: boolean = false;

  @HostListener('document:keydown', ['$event'])
  documentKeydownEvent(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Tab') {
      this.handleBlurSelect();
    }
  }

  ngOnChanges() {
    this.filterOptions = this.options;
  }

  handleBlurSelect() {
    this.focused = false;
  }

  handleToggleFocus() {
    this.focused = !this.focused;
    this.getFilteredOptions('');
  }

  handleSelectOption(option: string) {
    if (this.disabled) return;

    this.control.patchValue(this.control.value === option ? '' : option);
    this.control.markAsDirty();
    this.handleBlurSelect();
  }

  getFilteredOptions(valueChanged: string | null) {
    if (valueChanged == null) {
      return;
    }

    this.filterOptions = this.options.filter((option) =>
      this.compareIgnoreCase(option, valueChanged)
    );
  }

  compareIgnoreCase(value: string, valueCompare: string) {
    return value
      .toLocaleLowerCase()
      .replace(/\s\s+/g, ' ')
      .trim()
      .includes(valueCompare.toLocaleLowerCase().replace(/\s\s+/g, ' ').trim());
  }
}
