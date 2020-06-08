import { Component, OnInit, Input } from "@angular/core";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import {
  Validators,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material";
declare var $: any;
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(
      control &&
      control.invalid &&
      form.submitted &&
      control.hasError("required")
    );
    const invalidParent = !!(
      control &&
      control.parent &&
      control.parent.hasError("mismatch")
    );
    const invalidLength = !!(
      control &&
      control.parent &&
      control.parent.hasError("minlength")
    );
    const invalidComplexity = !!(
      control &&
      control.parent &&
      control.parent.hasError("complexity")
    );

    return invalidCtrl || invalidParent || invalidLength || invalidComplexity;
  }
}
@Component({
  selector: "field-password",
  templateUrl: "./field-password.component.html",
  styleUrls: ["./field-password.component.scss"],
})
export class FieldPasswordComponent implements OnInit {
  @Input("idinput") id: string = "fieldpassword";
  @Input() value: string = "";
  @Input() placeholder: string = "";
  @Input() hintMsg: string = "";
  @Input() errorMsg: string = "Campo inválido.";
  @Input() errorReqMsg: string = "Campo obrigatório!";
  @Input() maxLenght: number;

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    if (this._required) this.fControl.setValidators([Validators.required]);
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

  @Input() fControl = new FormControl("", []);
  @Input() fGroup = new FormGroup({});
  errorMatcher;
  @Input() withMatcher = false;

  constructor() {}

  ngOnInit() {
    if (this.withMatcher) {
      this.errorMatcher = new MyErrorStateMatcher();
    }
    $(".passwordRegex").on("input", function (e) {
      $(this).val(
        $(this)
          .val()
          .replace(
            /([#0-9]\u20E3)|[\xA9\xAE\u203C\u2047-\u2049\u2122\u2139\u3030\u303D\u3297\u3299][\uFE00-\uFEFF]?|[\u2190-\u21FF][\uFE00-\uFEFF]?|[\u2300-\u23FF][\uFE00-\uFEFF]?|[\u2460-\u24FF][\uFE00-\uFEFF]?|[\u25A0-\u25FF][\uFE00-\uFEFF]?|[\u2600-\u27BF][\uFE00-\uFEFF]?|[\u2900-\u297F][\uFE00-\uFEFF]?|[\u2B00-\u2BF0][\uFE00-\uFEFF]?|(?:\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDEFF])[\uFE00-\uFEFF]?|[\u20E3]|[\u26A0-\u3000]|\uD83E[\udd00-\uddff]|[\u00A0-\u269F]/g,
            ""
          )
      );
    });
  }
  ngAfterViewInit() {
    var scopeId = this.id;

    $("#" + this.id)
      .parent()
      .parent()
      .find(".eye")
      .click(function () {
        if ($(this).hasClass("active")) {
          $(this).removeClass("active");
          $("#" + scopeId).prop("type", "password");
        } else {
          $(this).addClass("active");
          $("#" + scopeId).prop("type", "text");
        }
      });
  }
}
