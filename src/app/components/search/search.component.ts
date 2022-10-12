import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() searchEvent: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  search(term: string): void{
    this.searchEvent.emit(term);
  }

}
