import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Food } from '../../models/food.model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';

import { ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
  providers: [FoodService]
})
export class FoodComponent implements OnInit {
  dataSource = new FoodDataSource(this.foodService);
 // dataSource = new MatTableDataSource(this.foodService.foods);
 
 // dataSource = new MatTableDataSource<Food>(this.foodService.foods);
  displayedColumns: string[] = ['rowIndex','nameFood', 'price'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

   ngOnInit() {
     this.dataSource.paginator = this.paginator;
  }

  // ngAfterViewInit() {
  //   //this.dataSource.paginator = this.paginator
  //   this.dataSource.paginator = this.paginator;
  // } 

  constructor(public foodService: FoodService, public http: HttpClient){}
}

export class FoodDataSource extends DataSource<any> {
  paginator: MatPaginator;

  constructor( public foodService: FoodService) { 
    super();
  }

  connect() : Observable<Food []>{
    return this.foodService.getFood();
  }

  disconnect(){}
}
