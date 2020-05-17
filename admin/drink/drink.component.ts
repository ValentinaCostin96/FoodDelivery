import { Component, OnInit } from '@angular/core';
import { DrinkService } from '../../services/drink.service';
import { Drink } from '../../models/drink.model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.css'],
  providers: [DrinkService]
})
export class DrinkComponent implements OnInit {
  public savedMsj = false;

  dataSource = new DrinkDataSource(this.drinkService);
  displayedColumns: string[] = ['rowIndex','nameDrink', 'price', 'stock'];
 
  constructor( public drinkService: DrinkService, public http: HttpClient) { }

  ngOnInit(): void {
    //this.refreshDrinkList();
    //this.resetForm();
   // window.location.reload();  //pr refresh la pg
  }

  refreshDrinkList() {
    this.drinkService.getDrinkList().subscribe((res) => {
      this.drinkService.drinks = res as Drink[];
    });
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.drinkService.selectedDrink = {
      _id: "",
      nameDrink: "",
      price: 0,
      stock: 0
    }
  }

  onEditDrink(drink: Drink) {
    this.drinkService.selectedDrink = drink;
    window.location.reload();
  }

  onDeleteDrink(_id: string, form: NgForm){
    if (confirm('Are you sure to delete this record ?') == true) {
      this.drinkService.deleteDrink(_id).subscribe((res) => {
        this.refreshDrinkList();
        this.resetForm(form);
      });
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.drinkService.postDrink(form.value).subscribe((res) => {
        this.resetForm(form);
        window.location.reload();
        this.refreshDrinkList();
        this.savedMsj = true;
        setTimeout(() => this.savedMsj = false, 3000);
      });
    }
    else {
      this.drinkService.putDrink(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshDrinkList();
        window.location.reload();
      });
    }
  }

}

export class DrinkDataSource extends DataSource<any> {
  constructor( public drinkService: DrinkService) { 
    super();
  }

  connect() : Observable<Drink []>{
    return this.drinkService.getDrink();
  }

  disconnect(){}
}