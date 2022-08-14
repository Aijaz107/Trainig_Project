import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['../../../../node_modules/bootstrap/dist/css/bootstrap.min.css','./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  
  transferType="";
  transferAmount:Number=0;
  msgCode="";

  isDisabledTransfer=true;

  transactionData:any={
    "customerId":"",
    "currencyCode":"INR",
    "receiverBIC":"",
    "receiverAccountHolderNumber":"",
    "receiverAccountHolderName":"",
    "messageCode":"",
    "transferAmount":"",
    "transferType":"",
    "totalDebit":"",
    "transferDate":""
  }

  constructor(private router:Router,private accountService:AccountService) { }

  accObj={}
  bicObj={}
  accHolderName=""
  accNumber=""
  aObj=(JSON.parse(localStorage.getItem('account') || '{}'))


  today = new Date();
  ngOnInit(): void {

    console.log(this.transferType.length);
    console.log(this.msgCode.length)
    console.log(this.transferAmount.toString.length)

  let accObj=(JSON.parse(localStorage.getItem('account') || '{}'))
  let bicObj=(JSON.parse(localStorage.getItem('bic') || '{}'))

  let accHolderName=(JSON.parse(localStorage.getItem('accHolderName') || '{}'))
  let accNumber=(JSON.parse(localStorage.getItem('accHolderNumber') || '{}'))

  this.transactionData.customerId=accObj.AccountNo;
  this.transactionData.receiverBIC=bicObj.bic;
  this.transactionData.receiverAccountHolderNumber=accNumber;
  this.transactionData.receiverAccountHolderName=accHolderName;
  this.transactionData.transferDate=this.today.getDate();
  console.log(this.transactionData)
  
  }

  matchTransferType(){
    this.checkAllFields();
    console.log(this.transferType)

    if(( this.aObj.AccountNo=='') ||( this.aObj.AccountNo=='') || (this.aObj.AccountNo=='')){
      if(this.transferType=='customer'){
        alert("reject")
        this.router.navigate(['/'])

      }
    }else{
        if(this.transferType=='bank'){
          alert('reject');
          this.router.navigate(['/'])

        }
    }
  }

  checkAllFields(){
    if(this.transferType.length==0 || this.msgCode.length==0 || this.transferAmount==0){
      this.isDisabledTransfer=true;
    }else{
      this.isDisabledTransfer=false;
    }
  }

  transferBalance(){
    console.log(this.transferType);
    console.log(this.transferAmount);
    console.log(this.msgCode);

    this.transactionData.transferType=this.transferType;
    this.transactionData.messageCode=this.msgCode;
    this.transactionData.transferAmount=this.transferAmount;
    // this.transactionData.totalDebit=(this.transferAmount*(0.0025))+this.transferAmount;
    console.log(this.transactionData);

    //updated code
                             //existing balance
    if(this.transferAmount>this.aObj.clearBalance){
        //if of is true
        if(this.aObj.od==true){
          console.log("transaction complted")
          this.accountService.transferService(this.transferType,this.transferAmount,this.msgCode).subscribe(
            (data) => {
              console.log('LOGIN SUCCESS', data);
              this.accountService.createUserSession(data);
              this.router.navigate(['/'])
            },
            (error) => {
              console.log('LOGIN FAILURE', error);
            }
          );
        }else{
          alert("No Sufficient balance")
        }
    }else{
      console.log("transaction complted")
      alert("transaction complted")
      this.accountService.transferService(this.transferType,this.transferAmount,this.msgCode).subscribe(
        (data) => {
          console.log('LOGIN SUCCESS', data);
          this.accountService.createUserSession(data);
          this.router.navigate(['/'])
        },
        (error) => {
          console.log('LOGIN FAILURE', error);
        }
      );
    }
    //update code

  
    localStorage.clear();
  }

}
