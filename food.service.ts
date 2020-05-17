import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food} from '../models/food.model';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  selectedFood: Food;
  foods: Food[];

  readonly baseURL = 'http://localhost:3000/foods';  

  constructor(public http: HttpClient) { }
  //try

  getFood(): Observable<Food[]> {
    return this.http.get<Food[]>(this.baseURL);
  }

  /*---------------------start--------------------------*/

  postFood(food: Food) {
    return this.http.post(this.baseURL, food);
  }

  // getFoodList() {
  //   return this.http.get(this.baseURL);
  // }

  putFood(food: Food) {
    return this.http.put(this.baseURL + `/${food._id}`, food);
  }

  deleteFood(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
