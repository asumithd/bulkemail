import { constants } from './../../../constants';
import { MessageService } from './../../../providers/message.service';
import { ShareService } from './../../../providers/share.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addsender',
  templateUrl: './addsender.component.html',
  styleUrls: ['./addsender.component.css']
})
export class AddsenderComponent implements OnInit {

  checked: boolean = false;
  checkedp: boolean = false;
  submitted = false;
  pagetype:any;
  pageId:any;
  senderForm:any;
  modalDisplay:any;

  constructor(
    private shareService: ShareService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {




    this.route.params.subscribe(params => {
      if (params.id) {
        this.pagetype = 'Edit';
        this.pageId = params.id;
        this.getEditData(params.id);
      } else {
        this.pagetype = 'Add';
      }
    });

    this.senderForm = this.formBuilder.group({
      bulkmailName: [''],
      bulkmailEmail: [''],
    })


    this.shareService.getData(constants.getbulkmail).subscribe(res => console.log(res))
  }
  get f() { return this.senderForm.controls; }
  submitform({ value }) {
    this.submitted = true;
    console.log(this.senderForm, this.senderForm.valid)
    if (this.senderForm.invalid) {
      return;
    }
    const data = this.senderForm.value;
    console.log(this.senderForm, this.senderForm.valid)
    this.modalDisplay = false;
    if (this.pageId) {
      this.updateData(this.pageId, data);
    } else {
      this.addData(data);
    }
  }
  reset() {
    this.senderForm.reset();
    this.router.navigate(['/sender']);
  }
  addData(val) {
    this.shareService.postData(constants.getbulkmail, val).subscribe(res => {
      console.log(res);
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err });
      });
    this.router.navigate(['/sender']);
  }
  updateData(id, val) {
    this.shareService.update(constants.getbulkmail + id, val).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Updated Successfully' });
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
    this.router.navigate(['/sender']);
  }
  getEditData(id) {
    this.shareService.getData(constants.getbulkmail + id).subscribe(res => {
      this.senderForm.patchValue(res.data[0])
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }


  checkboxseletc(data) {
    console.log( this.senderForm.controls)
    this.senderForm.controls.itemSaleSellingPrice.patchValue('3434', Validators.required); 

  }


}
