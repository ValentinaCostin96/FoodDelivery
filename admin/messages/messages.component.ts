import { Component, OnInit } from '@angular/core';
import { ContactUsService } from '../../services/contact-us.service';
import { ContactUs } from '../../models/contact-us.model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [ ContactUsService ]
})
export class MessagesComponent implements OnInit {
  public savedMsj = false;

  dataSource = new MessageDataSource(this.messageService);
  displayedColumns: string[] = ['rowIndex','name', 'message', 'dateSent'];
 
  constructor(public messageService: ContactUsService, public http: HttpClient) { }

  ngOnInit(): void {
  }

}

export class MessageDataSource extends DataSource<any> {
  constructor( public messageService: ContactUsService) { 
    super();
  }

  connect() : Observable<ContactUs []>{
    return this.messageService.getMessages();
  }

  disconnect(){}
}
