import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'h-svg',
  templateUrl: './highlight-svg.component.html',
  styleUrls: ['./highlight-svg.component.scss']
})
export class HighlightSvgComponent implements OnInit {

  @Input() rectX = 0;
  @Input() rectY = 0;
  @Input() rectWidth = 0;
  @Input() rectHeight = 0;
  @Input() curve = 0;

  svgwidth = window.innerWidth;
  svgheight = window.innerHeight;

  @Input() currentElement;
  @Input() tooltipid = "tooltipid";
  constructor() { }

  ngOnInit() {
    
  }


}
