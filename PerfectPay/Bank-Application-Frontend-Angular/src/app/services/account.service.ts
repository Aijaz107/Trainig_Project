import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _object: any = null;
  private _receiverObject: any = null;


  constructor(private httpClient:HttpClient) { }

  createUserSession(object:any){
    this._object = object;
    localStorage.setItem("account",JSON.stringify(object))
    // this.userSubject.next(this._user);
  }

  createReceiverSession(receiverObject:any){
    this._receiverObject = receiverObject;
    localStorage.setItem("bic",JSON.stringify(receiverObject))
  }
  checkBicService(bicNumber:String){
    const url =
    'http://localhost:9090/bankDetails/' + bicNumber ;
  const data = {
    accNumber: bicNumber ,
  };
  return this.httpClient.get<any>(url);
  }

  currencyService(currencyCode:String){
    const url =
    'http://localhost:9090/currencyDetails/' + currencyCode;

    return this.httpClient.get<any>(url);
  }
  
  transferTypeService(transferType:String){
    const url =
    'http://localhost:9090/transferTypeDetails/' + transferType;

    return this.httpClient.get<any>(url);
  }

  messageCodeService(msgCode:String){
    const url =
    'http://localhost:9090/messageCodeDetails/' + msgCode;

    return this.httpClient.get<any>(url);
  }

  transferService(tData:any){
    const url =
    'http://localhost:9090/addTransactionDetails/';
  // const data = {
  //   transferType: transferType,
  //   transferAmount: transferAmount,
  //   msgCode: msgCode,
  // };
  return this.httpClient.post(url, tData);
}

transactionidService(transactionid:Number){
  const url =
    'http://localhost:9090/transactionDetails/' + transactionid;

    return this.httpClient.get<any>(url);
}


  activate(accountNo:Number){
    const url =
      'http://localhost:9090/customerDetails/' + accountNo ;
    const data = {
      accNumber: accountNo ,
    };
    return this.httpClient.get<any>(url);
  }

  sanctionService(accHolderName:String){
    const url =
    'http://localhost:9090/checkSDNList/' + accHolderName ;
  const data = {
    accNumber: accHolderName ,
  };
  return this.httpClient.get<any>(url);
  }

}
