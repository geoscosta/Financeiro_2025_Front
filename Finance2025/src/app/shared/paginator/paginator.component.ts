import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Input() page: number = 1;
  @Input() totalPages: number = 1;
  @Input() elementsShowing: number = 1;
  @Input() totalElements: number = 1;
  @Output() selectPageFunc = new EventEmitter<number>();

  public numberOfIndexesDisplayed: number = 5;
  public middleIndexes: number[] = [];

  setPage(index: number) {
    if (this.page === index) return;

    this.page = index;
    this.setMiddleIndexes();
    this.eventEmitter(index);
  }

  getMiddleIndexes() {
    this.setMiddleIndexes();

    return this.middleIndexes;
  }

  setMiddleIndexes() {
    const indexes = Array.from(Array(this.totalPages).keys()).slice(2);

    if (indexes.length <= 3) {
      this.middleIndexes = indexes;
    } else if (this.page <= indexes[0]) {
      this.middleIndexes = indexes.slice(0, 3);
    } else if (this.page >= indexes[indexes.length - 1]) {
      this.middleIndexes = indexes.slice(indexes.length - 3, indexes.length);
    } else {
      const position = indexes.findIndex((x) => x === this.page);
      this.middleIndexes = indexes.slice(position - 1, position + 2);
    }
  }

  eventEmitter(index: number) {
    if (this.selectPageFunc) {
      this.selectPageFunc.emit(index);
    }
  }
}
