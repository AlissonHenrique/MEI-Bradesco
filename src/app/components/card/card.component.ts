import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: "card",
  styleUrls: ["./card.component.scss"],
  template:
    `
    <div [class]="cardClass">
    <div class="container">
    <div class="row">
    <ng-content></ng-content>
    </div>
    </div>
</div>
`
})
export class CardComponent implements OnInit {
  @Input() cardClass: string = '';
  
  ngOnInit() { }
}