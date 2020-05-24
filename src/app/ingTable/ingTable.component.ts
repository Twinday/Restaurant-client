import { Component, OnInit,  } from '@angular/core';
import {IngService} from '../shared/ing.service';

@Component({
  selector: 'app-ing-table',
  templateUrl: './ingTable.component.html',
  styleUrls: ['./ingTable.component.css']
})

export class IngTableComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Name', 'Measure', 'Available', 'DateManufacture', 'DateExpiration'];
  private Loading = true;

  constructor(public ingservice: IngService) { }

  updateIng() {
    this.ingservice.LoaderIng().subscribe(() => {this.Loading = false; });
  }

  ngOnInit() {}

}
