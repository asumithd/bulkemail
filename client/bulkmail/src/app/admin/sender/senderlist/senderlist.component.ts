import { ShareService } from './../../../providers/share.service';
import { ConfirmationService } from 'primeng-lts/api';
import { MessageService } from './../../../providers/message.service';
import { constants } from './../../../constants';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-senderlist',
  templateUrl: './senderlist.component.html',
  styleUrls: ['./senderlist.component.css']
})
export class SenderlistComponent implements OnInit {
   
  datasource: any;
  totalRecords: number;
  cols:any;
  modalDisplay: boolean;
  senderForm:any;
  product:  any = {}
  constructor(
    private shareService: ShareService,
    private router:Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getTableData();
  }
  showDialog(data) {
console.log(data);

    this.router.navigate(['/sender/editsender/' + data._id ]);
  }
  
  getTableData() {
    this.shareService.getData(constants.getbulkmail).subscribe(
      results => {
        console.log(results);
        
        this.datasource = results.data;
        this.totalRecords = this.datasource.length;
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }
 
  updateData(id, val) {
    this.shareService.update(constants.getbulkmail + id, val).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Updated Successfully' });
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }

  
  
  deleteData(val) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this data?',
      accept: () => {
        this.shareService.delete(constants.getbulkmail + val._id).subscribe(res => {
          var index = this.datasource.indexOf(val);
          if (index !== -1) {
            this.datasource.splice(index, 1);
          }
        },
          err => {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err });
          });
      }
    });
  }
    

}
