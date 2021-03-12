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
  Unit: any;
  itemForm: any;
  pagetype: any;
  pageId: any;
  modalDisplay: boolean;
  Account: any;
  Purchase: any;
  Sales: any;
  selectedCity3: any;
  selectedCity2: any;
  checked: boolean = false;
  checkedp: boolean = false;
  submitted = false;
  groupedCities: any;
  sgroupedCities: any;


  constructor(
    private shareService: ShareService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.Unit = [{ name: 'box', id: '23' }, { name: 'cm', id: '24' }, { name: 'dz', id: '25' }, { name: 'ft', id: '26' }, { name: 'g', id: '27' }, { name: 'in', id: '28' }, { name: 'kg', id: '29' }, { name: 'km', id: '30' }, { name: 'lb', id: '31' }, { name: 'm', id: '32' }, { name: 'mg', id: '33' }, { name: 'pcs', id: '34' }];
    this.groupedCities = [
      {
        label: 'Income',
        items: [
          { label: 'Discount', value: "Discount" },
          { label: 'General Income', value: "General Income" },
          { label: 'Interest Income', value: "Interest Income" },
          { label: 'Late Fee Income', value: "Late Fee Income" },
          { label: 'Other Charges', value: "Other Charges" },
          { label: 'Sales', value: "Sales" },
          { label: 'Shipping Charge', value: "Shipping Charge" }
        ]
      }
    ];
    this.sgroupedCities = [
      {
        label: 'Expence',
        items: [
          { label: 'Advertising And Marketing', value: "Advertising And Marketing" },
          { label: 'Automobile Expanse', value: "Automobile Expanse" },
          { label: 'Bad Debt', value: "Bad Debt" },
          { label: 'Bank Fees and Chargers', value: "Bank Fees and Chargers" },
          { label: 'Consultant Expense', value: "Consultant Expense" },
          { label: 'Contract Assets', value: "Contract Assets" },
          { label: 'Credit Card Charges', value: "Credit Card Charges" },
          { label: 'Depreciation And Amortisation', value: "Depreciation And Amortisation" },
          { label: 'Depreciation Expanse', value: "Depreciation Expanse" },
          { label: 'IT and Internet Expenses', value: "IT and Internet Expenses" },
          { label: 'Janitorial Expaense', value: "Janitorial Expaense" },
          { label: 'Lodging', value: "Lodging" },
          { label: 'Meals and Entertainment', value: "Meals and Entertainment" },
          { label: 'Office Supplies', value: "Office Supplies" },
          { label: 'Other Expenses', value: "Other Expenses" },
          { label: 'Postage', value: "Postage" },
          { label: 'Printing and Stationery', value: "Printing and Stationery" },
          { label: 'Raw Materials And Consumbles', value: "Raw Materials And Consumbles" },
          { label: 'Repairs and Maintenance', value: "Repairs and Maintenance" },
          { label: 'Salaries and Employee Wages', value: "Salaries and Employee Wages" },
          { label: 'Telephone Expenses', value: "Telephone Expenses" },
          { label: 'Transportation Expense', value: "Transportation Expense" },
          { label: 'Travel Expense', value: "Travel Expense" },
          { label: 'Uncategorized', value: "Uncategorized" }
        ]
      },
      {
        label: 'Cost Of Goods Sold',
        items: [
          { label: 'Cost Of Goods Sold', value: "Cost Of Goods Sold" },
          { label: 'Job Costing', value: "Job Costing" },
          { label: 'Labor', value: "Labor" },
          { label: 'Materials', value: "Materials" },
          { label: 'Subcontractor', value: "Subcontractor" }
        ]
      }
    ];


    this.route.params.subscribe(params => {
      if (params.id) {
        this.pagetype = 'Edit';
        this.pageId = params.id;
        this.getEditData(params.id);
      } else {
        this.pagetype = 'Add';
      }
    });

    this.itemForm = this.formBuilder.group({
      itemType: [''],
      itemName: ['', Validators.required],
      itemUnit: [''],
      itemSaleSellingPrice: ['', null],
      itemSaleAccount: [''],
      itemSaleDescription: [''],
      itemPurInfo: [''],
      itemSaleInfo: [''],
      itemPurDescription: [''],
      itemPurSellingPrice: ['', Validators.required],
      itemPurAccount: ['', Validators.required],

    })
    //   this.registerForm = this.formBuilder.group({
    //     firstName: ['', Validators.required],
    //     lastName: ['', Validators.required],
    //     email: ['', [Validators.required, Validators.email]],
    //     password: ['', [Validators.required, Validators.minLength(6)]]
    // });
    // getitem

    this.shareService.getData(constants.getitem).subscribe(res => console.log(res))
  }
  get f() { return this.itemForm.controls; }
  submitform({ value }) {
    this.submitted = true;
    console.log(this.itemForm, this.itemForm.valid)
    if (this.itemForm.invalid) {
      return;
    }
    const data = this.itemForm.value;
    console.log(this.itemForm, this.itemForm.valid)
    this.modalDisplay = false;
    if (this.pageId) {
      this.updateData(this.pageId, data);
    } else {
      this.addData(data);
    }
  }
  reset() {
    this.itemForm.reset();
    this.router.navigate(['/items']);
  }
  addData(val) {
    this.shareService.postData(constants.getitem, val).subscribe(res => {
      console.log(res);
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err });
      });
    this.router.navigate(['/items']);
  }
  updateData(id, val) {
    this.shareService.update(constants.getitem + id, val).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Updated Successfully' });
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
    this.router.navigate(['/items']);
  }
  getEditData(id) {
    this.shareService.getData(constants.getitem + id).subscribe(res => {
      this.itemForm.patchValue(res.data[0])
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(err) });
      });
  }
  submitForm(val) {

  }
  selectUnit(val) {

  }

  checkboxseletc(data) {
    console.log( this.itemForm.controls)
    this.itemForm.controls.itemSaleSellingPrice.patchValue('3434', Validators.required); 

  }


}
