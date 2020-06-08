import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Highlight } from 'src/app/highlight/highlight';
declare var $: any;

@Component({
  selector: 'tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
  @ViewChild('setaleft') setaleft: ElementRef;
  @Input() contentText:string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat";
  @Input() setid:string = "tooltipid";
  @Input() clickVoltar = () => {  };
  @Input() clickProximo = () => {  };
  @Input() close = () =>{ };
  
  constructor() { 
    //getBoundingClientRect
    

  }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    /*
    let rect = this.setaleft.nativeElement.getBoundingClientRect();
    console.log(rect.top, rect.left);
    */


    //gambiarra
    

  }

  

}
