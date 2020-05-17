import { Component, OnInit } from '@angular/core';
import { DesertService } from '../../services/desert.service';
import { Desert } from '../../models/desert.model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-desert',
  templateUrl: './desert.component.html',
  styleUrls: ['./desert.component.css'],
  providers: [ DesertService ]
})
export class DesertComponent implements OnInit {
  public savedMsj = false;
  dataSource = new DesertDataSource(this.desertService);
  displayedColumns: string[] = ['rowIndex','nameDesert', 'price'];

  ngOnInit(): void {
    //this.refreshDesertList();
    // this.resetForm();
  }

  constructor( public desertService: DesertService, public http: HttpClient) { }


  // refreshDesertList(){
  //   this.desertService.getDesert().subscribe((res) =>{
  //       this.desertService.deserts  =res as Desert[];
  //   });
  // }

  
  // resetForm(form?: NgForm) {
  //   if (form)
  //     form.reset();
  //   this.desertService.selectedDesert = {
  //     _id: "",
  //     nameDesert: "",
  //     price: 0
  //   }
  // }

  // onEditDesert(desert: Desert) {
  //   this.desertService.selectedDesert = desert;
  //   window.location.reload();
  // }

  // onDeleteDesert(_id: string, form: NgForm){
  //   if (confirm('Are you sure to delete this record ?') == true) {
  //     this.desertService.deleteDesert(_id).subscribe((res) => {
  //       this.refreshDesertList();
  //       this.resetForm(form);
  //     });
  //   }
  // }

  // onSubmit(form: NgForm) {
  //   if (form.value._id == "") {
  //     this.desertService.postDesert(form.value).subscribe((res) => {
  //       this.resetForm(form);
  //       this.refreshDesertList();
  //       window.location.reload();
  //       this.savedMsj = true;
  //       setTimeout(() => this.savedMsj = false, 3000);
  //     });
  //   }
  //   else {
  //     this.desertService.putDesert(form.value).subscribe((res) => {
  //       this.resetForm(form);
  //       this.refreshDesertList();
  //       window.location.reload();
  //     });
  //   }
  // }

}

export class DesertDataSource extends DataSource<any> {
  constructor( public desertService: DesertService) { 
    super();
  }

  connect() : Observable<Desert []>{
    return this.desertService.getDesert();
  }

  disconnect(){}
}
