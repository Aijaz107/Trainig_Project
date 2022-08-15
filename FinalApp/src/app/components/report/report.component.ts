import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['../../../../node_modules/bootstrap/dist/css/bootstrap.min.css','./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private router:Router, private accountService:AccountService) { }

  tData:any={
    "customer": {
        "customerId": "",
        "accountHolderName": "",
        "overDraftFlag": 0.0,
        "clearBalance": 0.0,
        "customerAddress": "",
        "customerCity": "",
        "customerType": ""
    },
    "currency": {
        "currencyCode": "",
        "currencyName": "",
        "conversionRate": 1.0
    },
    "receiverAccountHolderNumber": "",
    "receiverAccountHolderName": "",
    "transferType": {
        "transferTypeCode": "",
        "transferTypeDescription": ""
    },
    "message": {
        "messageCode": "",
        "instruction": ""
    },
    "transferFees": 0.0,
    "inrAmount": 0,
    "transferDate": "",
    "receiverBank": {
        "bankName": "",
        "bic": ""
    }
}
  transactionid=0;
  ngOnInit(): void {
    let tid=(JSON.parse(localStorage.getItem('transactionid') || '{}'))
    this.transactionid=Number(tid)

    console.log("report")
    this.accountService.transactionidService(this.transactionid).subscribe(
      (data) => {
        
        console.log('LOGIN SUCCESS', data);
        this.tData=data;
        // this.router.navigate(['/'])
        
      },
      (error) => {
        console.log('LOGIN FAILURE', error);
      }
    );
 }  

 close(){
  localStorage.clear();
  this.router.navigate(['/'])
 }

//  localStorage.clear();

}


