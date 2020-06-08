import { CustomerReasonsExclusion } from "src/app/enums/customer-reasons-exclusion";
import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { FormControl, Validators, FormGroup, NgForm } from "@angular/forms";
import { CustomValidators } from "../fields/custom-validators";
import { CustomerService } from "src/app/services/customer.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CustomerDTO } from "src/app/dto/customer-dto";
import { CountryDTO } from "src/app/dto/country-dto";
import { NotificationService } from "src/app/services/notification.service";
import {
  REGISTER_SUCCESS,
  UNKNOWN_MOTHER,
  UNKNOWN_FATHER,
  DEFAULT_TERM_FILE_NAME,
  FILE_SEND_SUCESS_MESSAGE,
  EXCLUSION_SUCCESS
} from "src/app/utils/constants.enum";
import { ValidatePassword } from "../fields/field-password/password-validator";
import { PostalCodeService } from "src/app/services/postal-code.service";
import { UtilsService } from "src/app/services/utils.service";
import { Observable } from "rxjs";
import { startWith } from "rxjs/internal/operators/startWith";
import { map } from "rxjs/operators";
import { ComboboxDTO } from "src/app/dto/combobox-dto";
import { CustomerAgreementTermDTO } from "src/app/dto/customer-agreement-term-dto";
import { CustomerRequestExclusionDTO } from "src/app/dto/customer-request-exclusion-dto";
import { LIVE_ANNOUNCER_ELEMENT_TOKEN_FACTORY } from "@angular/cdk/a11y";
import { __classPrivateFieldSet } from "tslib";
import { CustomerAdditionalDataDTO } from 'src/app/dto/customer-additional-data-dto';

declare var $: any;

@Component({
  selector: "app-edit-form",
  templateUrl: "./edit-form.component.html",
  styleUrls: ["./edit-form.component.scss"]
})
export class EditFormComponent implements OnInit, AfterViewInit {
  actualMaxDatePicker = new Date();
  customerDisplayName: string = "";
  customerCompanyDisplayName: string = "";
  customValidator: CustomValidators = new CustomValidators();
  formDoc = "1";
  gender = null;
  scrollingElement = document.scrollingElement || $("html");
  city: string;
  succExcl = "modalSuccess";
  succExcl2 = "modalSuccess2";
  description = "";
  errorPassword: boolean;
  sucessPassword: boolean;
  sucessOne: boolean;
  sucessTwo: boolean;

  modalStatusTrue: boolean;
  maritalStatus = [];
  statesList = [];
  idCardIssuerCodesList = [];
  drvLicenseIssuerCodeList = [];
  statusList = [];
  typeAddressList = [];
  countryList: Array<CountryDTO> = [];
  filteredOptions: Observable<Array<CountryDTO>>;
  block = false;
  currentPage = window.location.href;
  reasonsExclusion: Array<ComboboxDTO> = [];
  customerAgreementTermDTO: CustomerAgreementTermDTO = new CustomerAgreementTermDTO();
  customerRequestExclusionDTO: CustomerRequestExclusionDTO = new CustomerRequestExclusionDTO();
  errorCurrentPassword: boolean;
  errorCurrentPasswordModal: boolean;
  errorCPF: boolean;
  showMessage: boolean;
  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(
    private customerService: CustomerService,
    private postalCodeService: PostalCodeService,
    private notificationService: NotificationService,
    public utilsService: UtilsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.getCustomerStatus();
  }
  ngOnInit() {
    //Evita salvar form com enter nos campos
    $(function(){
      var keyStop = {
        8: ":not(input:text, textarea, input:file, input:password)", // stop backspace = back
        13: "input:text, input:password", // stop enter = submit 
     
        end: null
      };
      $(document).bind("keydown", function(event){
       var selector = keyStop[event.which];
     
       if(selector !== undefined && $(event.target).is(selector)) {
           event.preventDefault(); //stop event
       }
       return true;
      });
    });
    this.getCustormerData(); // Preenche os campos
    setTimeout(() => {
      $(".modal-backdrop").hide();
    }, 4000);

    setInterval(() => {
      document.querySelector("body").removeAttribute("style");
    }, 1);

    ///REPLACE EMOJI
    $("input").on("input", function (e) {
      $(this).val(
        $(this)
          .val()
          .replace(
            /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
            ""
          )
      );
    });
  }

  tabControl = new FormControl();
  value_tab = "usuario";

  tabs = [
    { id: "usuario", name: "Dados do usuário" },
    { id: "empresa", name: "Dados da empresa" },
    { id: "senha", name: "Alterar senha" }
  ];

  // =======================
  // Controls da Empresa
  empresaForm: FormGroup;

  fantasiaControl: FormControl;
  cnpjControl: FormControl;
  dateInicioControl: FormControl;
  estadoControl: FormControl;
  cepControl: FormControl;
  tipoLogradouroControl: FormControl;
  razaoControl: FormControl;
  nireControl: FormControl;
  telControl: FormControl;
  cidadeControl: FormControl;
  logradouroControl: FormControl;
  bairroControl: FormControl;
  numeroControl: FormControl;
  complementoControl: FormControl;
  otherReasonControl: FormControl;

  //Controls do Usuário.
  userForm: FormGroup;
  excluirForm: FormGroup;

  nameControl: FormControl;
  paisControl: FormControl;
  civilControl: FormControl;
  cpfControl: FormControl;
  nascimentoControl: FormControl;
  rgControl: FormControl;
  cnhControl: FormControl;
  emissorControl: FormControl;
  emissorRGControl: FormControl;
  ufControl: FormControl;
  ufRGControl: FormControl;
  emissaoControl: FormControl;
  emissaoRGControl: FormControl;
  vencimentoControl: FormControl;
  maeControl: FormControl;
  maeCheckControl: FormControl;
  paiControl: FormControl;
  paiCheckControl: FormControl;
  emailControl: FormControl;
  celularControl: FormControl;

  reasonControl: FormControl;
  passwordExclusionControl: FormControl;
  exclusionPartnerControl: FormControl;

  createCompanyForm() {
    const companydata = this.custormerData.additionalData;

    this.fantasiaControl = new FormControl(companydata.companyTradeName, {
      updateOn: "blur"
    });
    this.cnpjControl = new FormControl(companydata.cnpj, {
      validators: [this.customValidator.isCNPJ()],
      updateOn: "blur"
    });
    this.dateInicioControl = new FormControl(
      companydata.companyFoundationDate,
      { validators: [this.customValidator.isDateValid()], updateOn: "blur" }
    );
    this.otherReasonControl = new FormControl(
      this.customerRequestExclusionDTO.reason
    );
    this.estadoControl = new FormControl(companydata.state, {
      updateOn: "blur"
    });
    const cepTemp = companydata.postalCode;
    if (cepTemp) {
      companydata.postalCode = Array(8 - cepTemp.toString().length + 1).join(0 || '0') + cepTemp;
    }
    this.cepControl = new FormControl(companydata.postalCode, {
      validators: [this.customValidator.isCep()]
    });
    this.tipoLogradouroControl = new FormControl(companydata.typeAddress, {
      updateOn: "blur"
    });
    this.razaoControl = new FormControl(companydata.companyLegalName, {
      updateOn: "blur"
    });
    this.nireControl = new FormControl(companydata.companyNire, {
      updateOn: "blur"
    });
    this.telControl = new FormControl(companydata.businessPhoneNumber, {
      validators: [this.customValidator.phoneValidator]
    });
    this.cidadeControl = new FormControl(companydata.city, {
      updateOn: "blur"
    });
    this.logradouroControl = new FormControl(companydata.street, {
      updateOn: "blur"
    });
    this.bairroControl = new FormControl(companydata.neighborhood, {
      updateOn: "blur"
    });
    this.numeroControl = new FormControl(companydata.number, {
      updateOn: "blur"
    });
    this.complementoControl = new FormControl(companydata.complement, {
      updateOn: "blur"
    });

    this.empresaForm = new FormGroup({
      fantasia: this.fantasiaControl,
      cnpj: this.cnpjControl,
      dateInicio: this.dateInicioControl,
      estado: this.estadoControl,
      cep: this.cepControl,
      tipoLogradouro: this.tipoLogradouroControl,
      razao: this.razaoControl,
      nire: this.nireControl,
      teleEmpresa: this.telControl,
      cidade: this.cidadeControl,
      logradouro: this.logradouroControl,
      bairro: this.bairroControl,
      numero: this.numeroControl,
      complemento: this.complementoControl
    });

    $("#telempresa_id").mask("+00 (00) 00000-0000", { reverse: false });
    $("#nire_id").mask("00000000000", { reverse: false });
  }

  createTabForm() {
    this.tabControl = new FormControl(this.value_tab, {});
  }

  createUserDataForm() {
    this.nameControl = new FormControl(this.custormerData.name, {
      validators: [this.customValidator.isValidName(), Validators.required],
      updateOn: "blur"
    });
    this.paisControl = new FormControl(
      this.custormerData.additionalData.country
    );
    this.civilControl = new FormControl(
      this.custormerData.additionalData.maritalStatus,
      { updateOn: "blur" }
    );
    this.cpfControl = new FormControl(this.custormerData.cpf, {
      validators: [this.customValidator.isCpf(), Validators.required],
      updateOn: "blur"
    });
    this.nascimentoControl = new FormControl(this.custormerData.additionalData.birthDate,
      { validators: [this.customValidator.isDateValid()], updateOn: "blur" }
    );

    this.rgControl = new FormControl(this.custormerData.additionalData.idCard, {
      updateOn: "blur"
    });
    this.cnhControl = new FormControl(
      this.custormerData.additionalData.drvLicense,
      { updateOn: "blur" }
    );
    this.emissorControl = new FormControl(
      this.custormerData.additionalData.drvLicenseIssuerCode,
      { updateOn: "blur" }
    );
    this.emissorRGControl = new FormControl(
      this.custormerData.additionalData.idCardIssuerCode,
      { updateOn: "blur" }
    );
    this.ufControl = new FormControl(
      this.custormerData.additionalData.drvLicenceIssuerState,
      { updateOn: "blur" }
    );
    this.ufRGControl = new FormControl(
      this.custormerData.additionalData.idCardIssuerState,
      { updateOn: "blur" }
    );
    this.emissaoControl = new FormControl(
      this.custormerData.additionalData.drvLicenseIssueDate,
      {
        validators: [
          this.customValidator.isDateValid(),
          //this.customValidator.isValidDateCNH(),
        ],
        updateOn: "blur"
      }
    );
    this.emissaoRGControl = new FormControl(
      this.custormerData.additionalData.idCardIssueDate,
      { validators: [this.customValidator.isDateValid()], updateOn: "blur" }
    );
    this.vencimentoControl = new FormControl(
      this.custormerData.additionalData.drvLicenseExpirationDate,
      {
        validators: [
          this.customValidator.isDateValid(),
          //this.customValidator.isValidDateCNH(),
        ],
        updateOn: "blur"
      }
    );
    this.maeControl = new FormControl(
      this.custormerData.additionalData.motherName,
      { updateOn: "blur" }
    );
    this.maeCheckControl = new FormControl(
      this.custormerData.additionalData.isUnknownMother,
      { updateOn: "blur" }
    );
    this.paiControl = new FormControl(
      this.custormerData.additionalData.fatherName,
      { updateOn: "blur" }
    );
    this.paiCheckControl = new FormControl(
      this.custormerData.additionalData.isUnknownFather,
      { updateOn: "blur" }
    );
    this.emailControl = new FormControl(this.custormerData.email, {
      validators: [Validators.email, Validators.required],
      updateOn: "blur"
    });
    this.celularControl = new FormControl(this.custormerData.phoneNumber, {
      validators: [this.customValidator.phoneValidator, Validators.required]
    });

    //formgroup pra controlar as validacoes dos campos
    this.userForm = new FormGroup({
      name: this.nameControl,
      pais: this.paisControl,
      civil: this.civilControl,
      cpf: this.cpfControl,
      nascimento: this.nascimentoControl,
      rg: this.rgControl,
      cnh: this.cnhControl,
      emissor: this.emissorControl,
      emissorRG: this.emissorRGControl,
      uf: this.ufControl,
      ufRG: this.ufRGControl,
      emissao: this.emissaoControl,
      emissaoRG: this.emissaoRGControl,
      vencimento: this.vencimentoControl,
      mae: this.maeControl,
      pai: this.paiControl,
      email: this.emailControl,
      celular: this.celularControl,
      isUnknownMother: this.maeCheckControl,
      isUnknownFather: this.paiCheckControl
    });

    setTimeout(() => {

      this.userForm.get("email").disable();
      if (this.custormerData.additionalData.isUnknownMother) {
        this.validateMothersName({ target: { checked: true } });
      }
      if (this.custormerData.additionalData.isUnknownFather) {
        this.validateFathersName({ target: { checked: true } });
      }
      this.modifyDoc(
        [this.custormerData.additionalData.drvLicense ? "1" : "0"].toString()
      );
    }, 300);

    $("#rg_id").mask("00000000000", { reverse: false });
    $("#cnh_id").mask("000000000000", { reverse: false });
  }

  createExclusionForm() {
    this.reasonControl = new FormControl(
      this.customerRequestExclusionDTO.reason,
      Validators.required
    );
    this.passwordExclusionControl = new FormControl(
      this.customerRequestExclusionDTO.confirmPassword,
      Validators.required
    );
    this.exclusionPartnerControl = new FormControl(
      this.customerRequestExclusionDTO.deletePartner,
      Validators.required
    );

    this.otherReasonControl = new FormControl(
      this.customerRequestExclusionDTO.reason
    );

    this.excluirForm = new FormGroup({
      reason: this.reasonControl,
      passwordExclusion: this.passwordExclusionControl,
      exclusionPartner: this.exclusionPartnerControl,
      otherReason: this.otherReasonControl
    });
    setTimeout(() => {
      this.excluirForm.controls.exclusionPartner.setValue("false");
    }, 1000);
  }

  //values do user
  custormerData: CustomerDTO = new CustomerDTO();

  //values da senha
  value_senha_atual = "";
  value_senha_nova = "";
  value_senha_nova2 = "";

  //====================
  //====================
  //Control da senha
  senhaAtualControl = new FormControl(this.value_senha_atual, {
    validators: [Validators.required],
    updateOn: "blur"
  });
  senhaNovaControl = new FormControl(this.value_senha_nova, {
    validators: [Validators.required, ValidatePassword],
    updateOn: "blur"
  });
  senhaNova2Control = new FormControl(this.value_senha_nova2, {
    validators: [Validators.required],
    updateOn: "blur"
  });

  //formgroup pra controlar as validacoes dos campos
  senhaForm = new FormGroup(
    {
      senhaAtual: this.senhaAtualControl,
      senhaNova: this.senhaNovaControl,
      senhaNova2: this.senhaNova2Control
    },
    this.customValidator.passwordMatchValidator
  );

  m_changed = function (event) {
    if (event == "usuario") {
      $('.nav-tabs a[href="#user"]').tab("show");
    } else if (event == "empresa") {
      $('.nav-tabs a[href="#company"]').tab("show");
    } else if (event == "senha") {
      $('.nav-tabs a[href="#password"]').tab("show");
    }
  };

  saveUser(): void {
    if (this.userForm.status == "VALID") {
      this.saveUserData();
    } else {
      //busca o primeiro field com erro.
      let target;
      target = $("#form-dados input[type=text].ng-invalid").first();

      if (target.length != 0) {
        $("html,body").animate(
          { scrollTop: $(target).offset().top - 81 - 110 },
          "slow",
          () => {
            target.focus();
          }
        );
      }
    }
  }
  saveCompanyData() {
    if (this.empresaForm.status == "VALID") {
      this.custormerData.additionalData.companyTradeName = this.fantasiaControl.value;
      this.custormerData.additionalData.cnpj = this.utilsService.onlyNumbers(
        this.cnpjControl.value
      );
      this.custormerData.additionalData.companyFoundationDate = this.utilsService.tranformDate(this.dateInicioControl.value);
      this.custormerData.additionalData.state = this.estadoControl.value;
      this.custormerData.additionalData.postalCode = this.utilsService.onlyNumbers(
        this.cepControl.value
      );
      this.custormerData.additionalData.typeAddress = this.tipoLogradouroControl.value;
      this.custormerData.additionalData.companyLegalName = this.razaoControl.value;
      this.custormerData.additionalData.companyNire = this.utilsService.onlyNumbers(
        this.nireControl.value
      );
      this.custormerData.additionalData.businessPhoneNumber = this.utilsService.onlyNumbers(
        this.telControl.value
      );
      this.custormerData.additionalData.city = this.cidadeControl.value;
      this.custormerData.additionalData.street = this.logradouroControl.value;
      this.custormerData.additionalData.neighborhood = this.bairroControl.value;
      this.custormerData.additionalData.number = this.numeroControl.value;
      this.custormerData.additionalData.complement = this.complementoControl.value;
      this.customerService.customerUpdate(this.custormerData).subscribe(() => {
        //$('#sucessSaveCompanyData').modal('show'); TODO: VERIFICAR SE EXISTIRA O MODAL

        this.sucessOne = true;
        this.animaScroll();

        ///////
        this.customerCompanyDisplayName = this.fantasiaControl.value
          ? this.fantasiaControl.value
          : "";
        this.customerService.setCompanyTradeName(
          this.customerCompanyDisplayName
        );
        this.dateInicioControl.setValue(this.empresaForm.controls.dateInicio.value);
        this.redirectPartner();
        setTimeout(() => {
          this.cepControl.setValue(this.empresaForm.controls.cep.value);
          this.custormerData.additionalData.cnpj = this.cnpjControl.value.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
            "$1.$2.$3/$4-$5"
          );
        }, 300);
      });
    } else {
      // busca o primeiro field com erro.
      let target = $("#form-empresa input[type=text].ng-invalid").first();
      if (target.length != 0) {
        $("html,body").animate(
          { scrollTop: $(target).offset().top - 81 - 110 },
          "slow",
          () => {
            target.focus();
          }
        );
      }
    }
  }
  animaScroll() {
    $(this.scrollingElement).animate(
      {
        scrollTop: 0,
      },
      500
    );
  }
  submitChangePassword() {
    this.errorCurrentPassword = false;
    this.sucessPassword = false;
    this.errorPassword = false;
    if (
      this.senhaAtualControl.value !== "" &&
      this.senhaNovaControl.value !== "" &&
      this.senhaAtualControl.value === this.senhaNovaControl.value
    ) {
      this.errorPassword = true;
    } else {
      this.onSubmitSenha();
    }
  }

  onSubmitSenha(): void {
    let request = {
      oldPassword: this.senhaAtualControl.value,
      newPassword: this.senhaNovaControl.value,
      newPasswordConfirmation: this.senhaNova2Control.value
    };
    this.showMessage = true;
    if (this.senhaForm.status == "VALID") {
      this.customerService.changePassword(request, this.showMessage).subscribe(() => {
        setTimeout(() => {
        this.sucessPassword = true;
        if (this.block) {
         // window.location.href = this.currentPage.replace("#/perfil", "");
        }
      }, 3000);
      },
      (err: any) => {
        if (err.message === "Senha inválida.") {
          this.errorCurrentPassword = true;
        }
      });
    }
  }

  modifyGender(gender: string) {
    this.gender = gender;
    switch (gender) {
      case "2":
        $("#genderM").removeClass("btn-active");
        $("#genderF").addClass("btn-active");
        break;
      default:
        $("#genderM").addClass("btn-active");
        $("#genderF").removeClass("btn-active");
    }
  }

  modifyDoc(documento: string) {
    this.formDoc = documento;
    switch (documento) {
      case "1":
        $("#RG").removeClass("btn-active");
        $("#CNH").addClass("btn-active");
        break;
      default:
        $("#RG").addClass("btn-active");
        $("#CNH").removeClass("btn-active");
    }
  }

  showModal2() {
    this.modalStatusTrue = $("#exclusionPartner").prop("checked");
    $("#exmodal").modal("hide");
    $("#modalSuccess").modal("show");
  }

  fillAdditionalData() {
    setTimeout(() => {
      this.customerService.fillComboAdditionalInformation().subscribe(
        (additionalInformation) => {
          this.statesList = additionalInformation.states;
          this.maritalStatus = additionalInformation.maritalStatus;
          this.idCardIssuerCodesList = additionalInformation.idCardIssuerCodes;
          this.drvLicenseIssuerCodeList =
            additionalInformation.driveLicenseIssuerCodes;
          this.statusList = additionalInformation.employeeStatus;
          this.typeAddressList = additionalInformation.typeAddresses;
          this.fillAllCountries();
        }
      );
    }, 800);
  }

  fillAllCountries() {
    this.postalCodeService.fillAllCountries().subscribe((countries) => {
      if (
        !(
          countries == null ||
          countries.paisesEmissores == null ||
          countries.paisesEmissores.length < 0
        )
      ) {
        this.countryList = countries.paisesEmissores;
        this.filteredOptions = this.userForm.controls.pais.valueChanges.pipe(
          startWith(""),
          map((value) => this._filter(value))
        );
      }
    });
  }

  private _filter(value: string): Array<CountryDTO> {
    const filterValue = value.toLowerCase();

    return this.countryList.filter((option) =>
      option.nome.toLowerCase().includes(filterValue)
    );
  }

  getCustormerData() {
    if (!this.block) {
      setTimeout(() => {
        this.customerService.getCustomerDTO().subscribe((customer) => {
          if (customer) {
            this.custormerData = customer;
            this.customerDisplayName = customer.name;
            this.customerCompanyDisplayName =
              customer.additionalData.companyTradeName;
            this.gender = customer.additionalData.gender;
            this.createTabForm();
            this.createUserDataForm();
            this.createCompanyForm();
            this.createExclusionForm();
            this.fillAdditionalData();
          }
        });
      }, 800);
    } else {
      this.value_tab = "senha";
    }
  }

  getCustomerStatus() {
    this.customerService.getCustomerStatus().subscribe(value => {
      this.block = value;
      if (this.block) {
        const currentPage = this.currentPage;
        window.onhashchange = function () {
          //impede o usuario de sair dessa url
          window.location.href = currentPage;
        };
      }
    });
  }

  saveUserData() {
    // Dados do Usuário
    if (this.formDoc === "1") {
      // Limpa dados RG
      this.userForm.controls.rg.setValue("");
      this.userForm.controls.emissorRG.setValue("");
      this.userForm.controls.ufRG.setValue("");
      this.userForm.controls.emissaoRG.setValue("");
    } else {
      // Limpa dados CNH
      this.userForm.controls.cnh.setValue("");
      this.userForm.controls.emissor.setValue("");
      this.userForm.controls.uf.setValue("");
      this.userForm.controls.emissao.setValue("");
      this.userForm.controls.vencimento.setValue("");
    }

    this.custormerData.name = this.userForm.controls.name.value;
    this.custormerData.additionalData.country = this.userForm.controls.pais.value;
    this.custormerData.additionalData.maritalStatus = this.userForm.controls.civil.value;
    this.custormerData.cpf = this.userForm.controls.cpf.value;
    this.custormerData.additionalData.birthDate = this.utilsService.tranformDate(this.userForm.controls.nascimento.value);
    this.custormerData.additionalData.gender = this.gender;
    // documento RG
    this.custormerData.additionalData.idCard = this.utilsService.onlyNumbers(
      this.userForm.controls.rg.value
    );
    this.custormerData.additionalData.idCardIssuerCode = this.userForm.controls.emissorRG.value;
    this.custormerData.additionalData.idCardIssuerState = this.userForm.controls.ufRG.value;
    this.custormerData.additionalData.idCardIssueDate = this.utilsService.tranformDate(this.userForm.controls.emissaoRG.value);

    // documento CNH
    this.custormerData.additionalData.drvLicense = this.utilsService.onlyNumbers(
      this.userForm.controls.cnh.value
    );
    this.custormerData.additionalData.drvLicenseIssuerCode = this.userForm.controls.emissor.value;
    this.custormerData.additionalData.drvLicenceIssuerState = this.userForm.controls.uf.value;
    this.custormerData.additionalData.drvLicenseIssueDate = this.utilsService.tranformDate(this.userForm.controls.emissao.value);
    this.custormerData.additionalData.drvLicenseExpirationDate = this.utilsService.tranformDate(this.userForm.controls.vencimento.value);

    this.custormerData.additionalData.motherName = this.userForm.controls.mae.value;
    this.custormerData.additionalData.isUnknownMother = this.userForm.controls.isUnknownMother.value;
    this.custormerData.additionalData.fatherName = this.userForm.controls.pai.value;
    this.custormerData.additionalData.isUnknownFather = this.userForm.controls.isUnknownFather.value;
    this.custormerData.email = this.userForm.controls.email.value;
    this.custormerData.phoneNumber = this.userForm.controls.celular.value;

    this.errorCPF = false;
    this.sucessTwo = false;
    this.showMessage = true;
    this.customerService.customerUpdate(this.custormerData, this.showMessage).subscribe(
      () => {
        this.sucessTwo = true;
        this.animaScroll();
        this.customerDisplayName = this.custormerData.name;
        this.customerService.setCustomerName(this.customerDisplayName);
        setTimeout(() => {
          this.setMaskDate();
        }, 300);
        this.redirectPartner();
      },
      (err: { message: string; }) => {
        if (err.message === 'CPF já cadastrado para outro cliente.') {
          this.errorCPF = true;
          this.animaScroll();
        }
      }
    );
    this.custormerData.cpf = this.cpfControl.value.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );
  }

  setMaskDate() {
    this.nascimentoControl.setValue(this.userForm.controls.nascimento.value);
    this.emissaoRGControl.setValue(this.userForm.controls.emissaoRG.value);
    this.emissaoControl.setValue(this.userForm.controls.emissao.value);
    this.vencimentoControl.setValue(this.userForm.controls.vencimento.value);
  }

  ngAfterViewInit() {
    this.setPostalCodeEvents();
  }

  setPostalCodeEvents() {
    if ($("#cep_id").length > 0) {
      this.cepControl.valueChanges.subscribe(() => {
        this.searchPostalCode();
      });
    } else {
      // aguarda o component de cep ser carregado, e chama novamente a função.
      setTimeout(() => {
        this.setPostalCodeEvents();
      }, 500);
    }
  }

  searchPostalCode() {
    if (this.cepControl.value && this.cepControl.valid) {
      this.postalCodeService
        .fillPostalCode(this.utilsService.onlyNumbers(this.cepControl.value))
        .subscribe(
          callBackPostalCode => {
            this.fillPostalCode(callBackPostalCode);
          },
          () => {
            this.fillPostalCode(null);
          }
        );
    }
  }

  hintCepMessage = "";
  fillPostalCode(postalCode: any) {
    this.hintCepMessage = "";
    //$('#mat-hint-19').removeClass('mat-error ng-star-inserted');
    if (
      !postalCode ||
      !postalCode.listaEndereco ||
      postalCode.listaEndereco.length === 0
    ) {
      this.hintCepMessage = "O CEP informado não foi localizado. Por favor, digite o endereço completo.";
      // $('#mat-hint-19').addClass('mat-error ng-star-inserted');
      postalCode = { listaEndereco: [{}] };
      this.complementoControl.setValue("");
      this.numeroControl.setValue("");
    }
    this.logradouroControl.setValue(postalCode.listaEndereco[0].endereco);
    this.bairroControl.setValue(postalCode.listaEndereco[0].bairro);
    this.cidadeControl.setValue(postalCode.listaEndereco[0].cidade);
    this.estadoControl.setValue(postalCode.listaEndereco[0].uf);
    this.tipoLogradouroControl.setValue(
      this.postalCodeService.identifyTypeAddress(
        postalCode.listaEndereco[0].tipoEndereco
      )
    );
  }

  validateMothersName(e) {
    this.validateParents(e, "mae", UNKNOWN_MOTHER, "isUnknownMother");
  }

  validateFathersName(e) {
    this.validateParents(e, "pai", UNKNOWN_FATHER, "isUnknownFather");
  }

  validateParents(e: any, input: any, msg: string, chekbox: any) {
    input = this.userForm.controls[input];
    chekbox = this.userForm.controls[chekbox];
    if (e.target.checked) {
      input.setValue(msg);
      chekbox.setValue(1);
      input.disable();
    } else {
      input.setValue("");
      chekbox.setValue(0);
      input.enable();
    }
  }

  redirectPartner() {
    const partnerIdentifier = this.activatedRoute.snapshot.queryParams.partnerId;
    const params = { partnerId: partnerIdentifier };
    if (this.activatedRoute.snapshot.queryParams.serviceId) {
      Object.assign(params, { serviceId: this.activatedRoute.snapshot.queryParams.serviceId });
    }

    if (partnerIdentifier) {
      this.router.navigate(["/nossos-parceiros-form"], {
        queryParams: params
      });
    }
  }

  getCustomerReasonsExclusion() {
    if (this.reasonsExclusion && this.reasonsExclusion.length > 0) { return; }
    setTimeout(() => {
      this.customerService.getCustomerReasonsExclusion().subscribe(
        response => {
          this.reasonsExclusion = response;
        },
        err => {
          this.notificationService.error(err.message);
        }
      );
    }, 800);
  }
  showField() {
    if (
      this.excluirForm.controls.reason.value == CustomerReasonsExclusion.OTHER
    ) {
      return true;
    }
  }
  getReasonsDesc() {
    const value = this.excluirForm.controls.reason.value;
    this.reasonsExclusion.forEach(element => {
      if (value === element.id) {
        this.description = element.name;
        if (
          value != CustomerReasonsExclusion.OTHER ||
          this.excluirForm.controls.otherReason.value == null ||
          this.excluirForm.controls.otherReason.value == ""
        ) {
          this.description = element.name;
        } else {
          this.description = this.excluirForm.controls.otherReason.value;
        }

        this.submitExcludeAccount(this.description);
      }
    });
  }

  submitExcludeAccount(reason) {
    this.errorCurrentPasswordModal = false;
    if (this.excluirForm.status == "VALID") {
      this.customerRequestExclusionDTO.customerId = this.custormerData.id;
      this.customerRequestExclusionDTO.reason = reason;
      this.customerRequestExclusionDTO.confirmPassword = this.excluirForm.controls.passwordExclusion.value;
      this.customerRequestExclusionDTO.deletePartner = this.excluirForm.controls.exclusionPartner.value;
      this.showMessage = true;
      setTimeout(() => {
        this.customerService
          .sendExcludeAccount(this.customerRequestExclusionDTO, this.showMessage)
          .subscribe(() => {
            $('#succesExcl').modal(
              {
                backdrop: 'static'
              }
            );

            $("#exmodal").modal("hide");
            $("#succesExcl").modal("show");
            $('#succesExcl').find('.close').click(() => {
              this.customerService.exitApplication();
            });

          },
          (err) => {
              if (err.message === "Senha inválida.") {
                this.errorCurrentPasswordModal = true;
              }
          });
      }, 200);
    } else {
      //busca o primeiro field com erro.
      let target = $("#form-excluir input[type=text].ng-invalid").first();
      if (target.length != 0) {
        $("html,body").animate(
          { scrollTop: $(target).offset().top - 81 - 110 },
          "slow",
          () => {
            target.focus();
          }
        );
      }
    }
  }

  onChecked(event: any) {
    this.excluirForm.controls.exclusionPartner.setValue(event.target.checked);
  }

  clearForm() {
    this.errorCurrentPasswordModal = false;
    this.excluirForm.reset();
    this.formDirective.resetForm();
    this.excluirForm.controls.exclusionPartner.setValue(false);
    $("input[id=" + "exclusionPartner" + "]").attr("checked", false);
  }

  handleClick() {
    this.getCustomerReasonsExclusion();
    $('#modal-excluir-cadastro').find('.close').click(() => {
      $('.modal-backdrop').toggle();
      this.clearForm();
    });
    document.querySelector("body").removeAttribute("style");
    setTimeout(() => {
      $("body").addClass("modal-open");
    }, 1);
  }
  handleAddTen() {
    setTimeout(function () {
      $(".cdk-overlay-container").addClass("ten");
    }, 300);
  }
  hadleRemoveTen() {
    $(".cdk-overlay-container").removeClass("ten");
  }
  dataEmissao: string;
  dataVencimento: string;
  erroEmissao: boolean = false;
  erroVencimento: boolean = false;

  //VALUE DO DATEPICKER
  handleValueDatePickerEmissao(e) {
    this.dataEmissao = e;
    this.vlEm();
  }
  //VALUE DO DATEPICKER
  handleValueDatePickerVencimento(e) {
    this.dataVencimento = e;
    this.vlVe();
  }
  //VALUE DO INPUT
  handleEmissaoCnh(e) {
    this.dataEmissao = e;
    this.vlEm();
  }
  //VALUE DO INPUT
  handleVencimentoCnh(e) {
    this.dataVencimento = e;
    this.vlVe();
  }

  vlEm() {
    if (this.customValidator.compareDate(this.dataEmissao, this.dataVencimento)) {
      this.erroEmissao = true;
      setTimeout(function () {
        $(".error-em")
          .parent()
          .children()
          .find("label")
          .addClass("error-color");
        $(".error-em").parent().children().find("path").addClass("fill");
        $(".error-em")
          .parent()
          .children()
          .find(".mat-form-field-underline")
          .addClass("error-risco");
      }, 200);
    } else {
      this.erroEmissao = false;
      setTimeout(function () {
        $(".mat-form-field-label").removeClass("error-color");
        $("label").removeClass("error-color");
        $("path").removeClass("fill");
        $(".mat-form-field-underline").removeClass("error-risco");
      }, 200);
    }
    if (this.customValidator.compareDate(this.dataVencimento, this.dataEmissao, true)) {
      this.erroVencimento = false;
      setTimeout(function () {
        $("label").removeClass("error-color");
        $("path").removeClass("fill");
        $(".mat-form-field-underline").removeClass("error-risco");
      }, 200);
    }
  }
  vlVe() {
    if (this.customValidator.compareDate(this.dataEmissao, this.dataVencimento)) {
      this.erroVencimento = true;
      setTimeout(function () {
        $(".error-ve")
          .parent()
          .children()
          .find("label")
          .addClass("error-color");
        $(".error-ve").parent().children().find("path").addClass("fill");
        $(".error-ve")
          .parent()
          .children()
          .find(".mat-form-field-underline")
          .addClass("error-risco");
      }, 200);
    } else {
      this.erroVencimento = false;
      setTimeout(function () {
        $("label").removeClass("error-color");
        $("path").removeClass("fill");
        $(".mat-form-field-underline").removeClass("error-risco");
      }, 200);
    }
    if (this.customValidator.compareDate(this.dataVencimento, this.dataEmissao, true)) {
      this.erroEmissao = false;
      setTimeout(function () {
        $("label").removeClass("error-color");
        $("path").removeClass("fill");
        $(".mat-form-field-underline").removeClass("error-risco");
      }, 200);
    }
  }
}
