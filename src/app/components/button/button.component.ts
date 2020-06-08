import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input("btnRoute") btnRoute: string;
  @Input("btnText") btnText: string;
  @Input("btnClass") btnClass: string;
  @Input("btnId") btnId: string = "id-app-button";

  constructor() { }

  ngOnInit() {
  }

}
