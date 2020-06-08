import { Component, OnInit, Input } from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'field-cpf',
  templateUrl: './field-cpf.component.html',
  styleUrls: ['./field-cpf.component.scss']
})
export class FieldCpfComponent implements OnInit {
  @Input('idinput') id: string = "fieldcpf";
  @Input() value: string = "";
  @Input() placeholder: string = "Cpf";
  @Input() hintMsg: string = "";
  @Input() errorMsg: string = "Número inválido.";
  @Input() errorReqMsg: string = "Campo obrigatório!";
  
  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    if(this._required)
      this.fControl.setValidators([Validators.required]);
  }
  private _required = true;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    
    
  }
  private _disabled = false;

  @Input() fControl = new FormControl('');

  constructor() { }

  ngOnInit() {
    $("#"+this.id).mask('000.000.000-00', {reverse: false});
    this._disabled ? this.fControl.disable() : this.fControl.enable();
    this.fControl.setValue(this.value);

  }


  //------validaçoes------------
  isCpf(){
    return (control: AbstractControl): Validators => {
      let tempCpf = control.value;
      tempCpf = tempCpf.replace(/\D/g, '');
      const cpf = tempCpf;
      
      var numeros, digitos, soma, i, resultado, digitos_iguais;

      digitos_iguais = 1;
      if (cpf == "")
        return null;
      if (cpf.length < 11)
          return { customNotValid: true };

      for (i = 0; i < cpf.length - 1; i++)
          if (cpf.charAt(i) != cpf.charAt(i + 1)) {
              digitos_iguais = 0;
              break;
          }

      if (!digitos_iguais) {
          numeros = cpf.substring(0, 9);
          digitos = cpf.substring(9);
          soma = 0;
          for (i = 10; i > 1; i--)
              soma += numeros.charAt(10 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(0))
              return { customNotValid: true };
          numeros = cpf.substring(0, 10);
          soma = 0;
          for (i = 11; i > 1; i--)
              soma += numeros.charAt(11 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(1))
              return { customNotValid: true };
          return null;
      }
      else
          return { customNotValid: true };
      
    }
  }

  

}
