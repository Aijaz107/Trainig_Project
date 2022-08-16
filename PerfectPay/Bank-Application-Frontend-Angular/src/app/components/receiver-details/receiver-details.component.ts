import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-receiver-details',
  templateUrl: './receiver-details.component.html',
  styleUrls: ['../../../../node_modules/bootstrap/dist/css/bootstrap.min.css','./receiver-details.component.css']
})
export class ReceiverDetailsComponent implements OnInit {

  bicNumber = "";
  accHolderName="";
  accNumber="";

  rApiData:any={
    bankName:"HDFC Bank"
  }

  isDisabled = true;
  isDisabledNext = true;

  isValidBIC:boolean=false;

  constructor(private router:Router, private accountService:AccountService) { }

  ngOnInit(): void {
  }

 checkBIC(){
  //remove code
  // this.accountService.createReceiverSession(this.rApiData);
  // this.isValidBIC=true;
  // remove code

 this.accountService.checkBicService(this.bicNumber).subscribe(
      (data) => {
        
        console.log('LOGIN SUCCESS', data);
        this.rApiData=data;
        this.accountService.createReceiverSession(data);
        this.isValidBIC=true;
        // this.router.navigate(['/'])
        
      },
      (error) => {
        Swal.fire({
          title: 'Details Not Found ',
          text: "Enter valid BIC number",
          icon:"error",
          backdrop: 'rgba(0,0,123,0.4)'
        })
        console.log('LOGIN FAILURE', error);
      }
    );
 }  

 validateNameNumber(){
  console.log(this.accHolderName.length)
  console.log(this.accNumber.length)
  if(this.accHolderName.length===0 || this.accNumber.length===0){
    this.isDisabledNext=true;
  }else{
    this.isDisabledNext=false;
  }
 }

 checkSanction(){
  console.log(this.accHolderName)
  console.log(this.accNumber)

  //remove code
  // localStorage.setItem("accHolderName",JSON.stringify(this.accHolderName))
  // localStorage.setItem("accHolderNumber",JSON.stringify(this.accNumber))
  // this.router.navigate(['/transaction'])
  // remove 

  this.accountService.sanctionService(this.accHolderName).subscribe(
    (data) => {
      if(data.message==="Found"){
        console.log("found",data)
        Swal.fire({
          title: 'Transaction Rejected',
          text: "Please contact the bank for further details",
          icon:"error",
          backdrop: 'rgba(0,0,123,0.4)'
        })
        this.router.navigate(['/receiver'])

        // alert("Transaction Rejected")
        // this.router.navigate(['/'])
        // window.alert("BIC Not Valid")
      }
      else{
        console.log("not else")
      console.log('LOGIN SUCCESS', data);
      localStorage.setItem("accHolderName",JSON.stringify(this.accHolderName))
      localStorage.setItem("accHolderNumber",JSON.stringify(this.accNumber))
      
      this.router.navigate(['/transaction'])
      // this.accountService.createUserSession(data);
      // this.isValidBIC=true;
      // this.router.navigate(['/'])
      }
    },
    (error) => {
      // console.log('LOGIN FAILURE', error);
      // Swal.fire({
      //   title: 'Transaction Rejected',
      //   text: "Please contact the bank for further details",
      //   icon:"error",
      //   backdrop: 'rgba(0,0,123,0.4)'
      // })
      // this.router.navigate(['/receiver'])
      console.log("not error",error)
      Swal.fire({
        title: 'Transaction Rejected',
        text: "Please contact the bank for further details",
        icon:"error",
        backdrop: 'rgba(0,0,123,0.4)'
      })
      this.router.navigate(['/receiver'])

    }
  );

  // this.router.navigate(['/transaction'])
 }

  checkBICLen(){
    let l=this.bicNumber.toString().length;
    if(l==11 || l>11){
      this.isDisabled = false;
      // this.isValidBIC=true;
    }else{
      this.isDisabled = true;
      this.isValidBIC=false;

    }
    console.log(this.bicNumber);
    
  }

}
