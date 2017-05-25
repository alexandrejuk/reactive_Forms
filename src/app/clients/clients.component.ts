import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { Client } from "app/clients/models/client.interface";


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {


  clientForm: FormGroup
// validacao personalizada
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/
  

  constructor(private fb: FormBuilder) { }
// dados do form
  ngOnInit() {
    this.clientForm = this.fb.group({
      name:['',[Validators.required]],
      phone:['',[Validators.required]],
      email:['',[Validators.required, Validators.pattern(this.emailPattern)]],
      confirm:['',[Validators.required, Validators.pattern(this.emailPattern)]]
    },{validator: ClientsComponent.equalsTo})
  }
// verifica email
  static equalsTo(group: AbstractControl): {[key:string]: boolean} {
    const email = group.get('email')
    const confirm = group.get('confirm')
    if(!email || !confirm){
      return undefined
    }if(email.value !== confirm.value){
      return {emailsNotMatch:true}
    }
    return undefined
  }

  mask(rawValue:string){
    if(rawValue===undefined){
				rawValue="";
		}
    const value = rawValue.replace(/\D+/g, '');
    if(value.length>10){
      return ['(',/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]
    }else{
      return ['(',/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]
    }
  }
// envia os dados
  onSubmit({value, status}:{value: Client, status:boolean}){
    console.log(value, status)
    this.clientForm.reset();
  }
}
