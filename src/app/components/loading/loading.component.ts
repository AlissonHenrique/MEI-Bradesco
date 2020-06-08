import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  modal2 = "modalLoad";

  constructor() { }

  ngOnInit() { }
}