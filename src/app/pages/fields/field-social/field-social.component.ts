import { Component, OnInit, Input } from "@angular/core";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
  AbstractControl
} from "@angular/forms";
declare var $: any;



@Component({
  selector: "field-social",
  templateUrl: "./field-social.component.html",
  styleUrls: ["./field-social.component.scss"]
})
export class FieldSocialComponent implements OnInit {
  @Input("idinput") id: string = "fieldsocialcnpj";
  @Input() value: string = "";
  @Input() placeholder: string = "Razão social";
  @Input() hintMsg: string = "";
  @Input() errorMsg: string = "Número inválido.";
  @Input() errorReqMsg: string = "Campo obrigatório!";
  @Input() textContent: string = "";
  vlQuery = "iconInvisivel";
  paramUrl: string = "";

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    if (this._required)
      this.fControl.setValidators([Validators.required, this.isCNPJ()]);
  }
  private _required = true;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  @Input() fControl = new FormControl(this.value, [this.isCNPJ()]);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    $("#" + this.id).mask("00.000.000/0000-00", { reverse: false });
    this.fControl.setValue(this.value);
    this._disabled ? this.fControl.disable() : this.fControl.enable();

    ///icon
    this.route.queryParams.subscribe((queryParams: any) => {
      this.paramUrl = queryParams["pg"];
    });
    if (this.paramUrl === "formalizacao") {
      this.vlQuery = "iconVisivel";
    } else {
      this.vlQuery = "iconInvisivel";
    }
  }

  isCNPJ() {
    return (control: AbstractControl): Validators => {
      let tempCnpj = control.value;
      tempCnpj = tempCnpj.replace(/[^\d]+/g, "");
      const cnpj = tempCnpj;

      if (cnpj == "") return null;

      if (cnpj.length != 14) return { customNotValid: true };

      // Elimina CNPJs invalidos conhecidos
      if (
        cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999"
      )
        return { customNotValid: true };

      // Valida DVs
      var tamanho = cnpj.length - 2;
      var numeros = cnpj.substring(0, tamanho);
      var digitos = cnpj.substring(tamanho);
      var soma = 0;
      var pos = tamanho - 7;
      for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(0)) return { customNotValid: true };
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(1)) return { customNotValid: true };
      return null;
    };
  }
}
