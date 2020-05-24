import { Component, OnInit } from '@angular/core';
import {IngService} from '../shared/ing.service';

@Component({
  selector: 'app-need-ing-table',
  templateUrl: './needIngTable.component.html',
  styleUrls: ['./needIngTable.component.css']
})
export class NeedIngTableComponent implements OnInit {


  displayedColumns: string[] = ['Id', 'Name', 'Measure', 'Available'];
  private Loading = true;

  constructor(public ingservice: IngService) { }

  updateNeedIng() {
    this.ingservice.LoaderNeedIng().subscribe(() => {
      // this.ingridients = yy;
      this.Loading = false; });
  }

  ngOnInit() {
  }

}
