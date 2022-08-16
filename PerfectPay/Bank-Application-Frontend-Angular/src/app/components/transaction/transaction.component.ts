import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['../../../../node_modules/bootstrap/dist/css/bootstrap.min.css','./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  
  transferType="";
  transferAmount:number=0;
  msgCode="CHQB";
  currencyCode="";

  isDisabledTransfer=true;

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

  currencyData={

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
    // console.log(this.transferAmount.toString.length)
    console.log(this.currencyCode)
    console.log("testttt")
    console.log(this.accObj)

  let accObj=(JSON.parse(localStorage.getItem('account') || '{}'))
  let bicObj=(JSON.parse(localStorage.getItem('bic') || '{}'))
  let accHolderName=(JSON.parse(localStorage.getItem('accHolderName') || '{}'))
  let accNumber=(JSON.parse(localStorage.getItem('accHolderNumber') || '{}'))

  //customer object
  this.tData.customer.customerId=accObj.customerId;
  this.tData.customer.accountHolderName=accObj.accountHolderName;
  this.tData.customer.overDraftFlag=accObj.overDraftFlag;
  this.tData.customer.clearBalance=accObj.clearBalance;
  this.tData.customer.customerAddress=accObj.customerAddress;
  this.tData.customer.customerCity=accObj.customerCity;
  this.tData.customer.customerType=accObj.customerType

  //currecy object updated in the function

  // receiver details
  this.tData.receiverAccountHolderName=accHolderName;
  this.tData.receiverAccountHolderNumber=accNumber;

  //transferTYpe object updated in the function
    //
    //
  
  this.tData.transferFees=(this.transferAmount * 0.025);
  this.tData.transferDate=this.today;
  this.tData.receiverBank=bicObj; 
  

  // this.transactionData.receiverBIC=bicObj.bic;
  // this.transactionData.receiverAccountHolderNumber=accNumber;
  // this.transactionData.receiverAccountHolderName=accHolderName;
  // this.transactionData.transferDate=this.today.getDate();
  console.log("final")
  console.log(this.tData)
  
  }

  updateCurrencyCode(){
    this.accountService.currencyService(this.currencyCode).subscribe(
      (data) => {
        console.log('Currency Code SUCCESS', data);
        // this.currencyData=data;
        this.tData.currency=data;
      },
      (error) => {
        console.log('Currency Code FAILURE', error);

      }
    ); 
  }


  updateTransferType(){
    this.accountService.transferTypeService(this.transferType).subscribe(
      (data) => {
        console.log('TransferType SUCCESS', data);
        // this.currencyData=data;
        this.tData.transferType=data;
      },
      (error) => {
        console.log('TransferType  FAILURE', error);

      }
    ); 
  }

  updateMessageCode(){
    this.accountService.messageCodeService(this.msgCode).subscribe(
      (data) => {
        console.log('msg SUCCESS', data);
        // this.currencyData=data;
        this.tData.message.messageCode=data.messageCode;
        this.tData.message.instruction=data.instruction;
      },
      (error) => {
        console.log('msg  FAILURE', error);

      }
    ); 
  }

  matchTransferType(){
    console.log(this.transferType)

    if(( this.aObj.AccountNo=='42895235807723') ||( this.aObj.AccountNo=='45002608912874') || (this.aObj.AccountNo=='69652133523248')){
      if(this.transferType=='Customer Transfer'){
        Swal.fire({
          title: 'Transaction Rejected',
          text: "Transfer type not valid ",
          icon:"error",
          backdrop: 'rgba(0,0,123,0.4)'
        })
        // alert("reject")
        this.transferType=""
        this.router.navigate(['/transaction'])

      }
    }else{
        if(this.transferType=='Bank Transfer'){
          Swal.fire({
            title: 'Transaction Rejected',
            text: "Transfer type not valid ",
            icon: "error",          
            backdrop: 'rgba(0,0,123,0.4)'
          })
          // alert('reject');
          this.transferType=""
          this.router.navigate(['/transaction'])

        }
    }

    this.checkAllFields();

    // updateing the transfer type object
    this.updateTransferType()
  }

  checkAllFields(){
    if(this.transferType.length==0 || this.msgCode.length==0 || this.transferAmount==0){
      this.isDisabledTransfer=true;
    }else{
      this.isDisabledTransfer=false;
    }
    this.updateMessageCode();
  }

  transferBalance(){
    console.log(this.transferType);
    console.log(this.transferAmount);
    console.log(this.msgCode);
    this.tData.inrAmount=this.transferAmount;
    this.tData.transferFees=(this.transferAmount * 0.025);

    // this.transactionData.transferType=this.transferType;
    // this.transactionData.messageCode=this.msgCode;
    // this.transactionData.transferAmount=this.transferAmount;
    // this.transactionData.totalDebit=(this.transferAmount*(0.0025))+this.transferAmount;
    console.log(this.tData);

    //updated code
                             //existing balance
    if(this.transferAmount>this.aObj.clearBalance){
        //if of is true
        if(this.aObj.od==true){
          console.log("transaction complted")
          this.accountService.transferService(this.tData).subscribe(
            (data) => {
              Swal.fire({
                title: "Transaction Completed",
                icon: "success",          
                timer: 5000,
                backdrop: 'rgba(0,0,123,0.4)'
              })
              console.log("t working")
              console.log('LOGIN SUCCESS', data);
              localStorage.setItem("transactionid",JSON.stringify(data))
              this.router.navigate(['/report'])
            },
            (error) => {
              console.log("t working")

              console.log('LOGIN FAILURE', error);
            }
          );
        }else{
          Swal.fire({
            title: "No Sufficient balance",
            icon: "error",          
            backdrop: 'rgba(0,0,123,0.4)'
          })        }
    }else{
      console.log("transaction complted sufficient balance")
      this.accountService.transferService(this.tData).subscribe(
        (data) => {
          Swal.fire({
            title: "Transaction Completed",
            icon: "success",          
            timer: 5000,
            backdrop: 'rgba(0,0,123,0.4)'
          })
          console.log("t working")

          console.log('LOGIN SUCCESS', data);
          localStorage.setItem("transactionid",JSON.stringify(data))

          this.router.navigate(['/report'])

        },
        (error) => {
          console.log('LOGIN FAILURE', error);
        }
      );
    }
    //update code

  
    // localStorage.clear();
  }

}
