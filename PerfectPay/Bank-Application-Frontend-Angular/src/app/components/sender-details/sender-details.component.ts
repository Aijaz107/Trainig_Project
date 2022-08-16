import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import Swal from 'sweetalert2';

//import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-sender-details',
  templateUrl: './sender-details.component.html',
  styleUrls: ['../../../../node_modules/bootstrap/dist/css/bootstrap.min.css','./sender-details.component.css']
})
export class SenderDetailsComponent implements OnInit {

  apiData:any= {
    "AccountNo":11223344,
    "accountHolderName":"name1",
    "clearBalance":12345,
    "od":false
  }
  today = new Date();
  senderAccountNumber!: Number;  

  isValidAcc:boolean=false;

  isDisabled = true;

  constructor(private router:Router, private accountService:AccountService) { 
    let button = document.getElementById("Button");
    
  }

  enableButton(){
    let l=this.senderAccountNumber.toString().length;
    if(l==14){
      this.isDisabled = false;
    }else{
      this.isDisabled = true;
    }
  }

  reciverMethod(){
    this.router.navigate(['/receiver'])
  }

  getDetails(){
    console.log("show Details")
    console.log(this.senderAccountNumber)
    
    // remove changes
    // this.accountService.createUserSession(this.apiData);
    // this.isValidAcc=true;
    // remove changes

    this.accountService.activate(this.senderAccountNumber).subscribe(
      (data) => {
        console.log('LOGIN SUCCESS', data);
        this.apiData=data;
        this.accountService.createUserSession(data);
        this.isValidAcc=true;
        // this.router.navigate(['/'])
      },
      (error) => {
        Swal.fire({
          title: 'User Not Found',
          text: "Enter valid account number",
          icon:"error",
          backdrop: 'rgba(0,0,123,0.4)'
        })
        console.log('LOGIN FAILURE', error);

      }
    );
    
    // redirect to receiver component
  }

  showAlert(){
    Swal.fire({
      title: 'User Not Found ',
      text: "Enter valid account number",
      icon:"error",
      backdrop: 'rgba(0,0,123,0.4)'
    })
    // window.alert("User not found");
    this.router.navigate(['/'])
  }

  ngOnInit(): void {
    if(this.today.getDay() == 6 || this.today.getDay() == 7){
      this.router.navigate(['weekerror']);
    }
    // console.log("S");
    // if(this.today.getDay)
  }

}
