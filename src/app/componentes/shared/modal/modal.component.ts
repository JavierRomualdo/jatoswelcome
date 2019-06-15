import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input()
  src: string;

  @Input()
  type: string;

  @ViewChild('script', { static: true }) script: ElementRef;

  convertToScript() {
    var element = this.script.nativeElement;
    var script = document.createElement("script");
    script.type = this.type ? this.type : "text/javascript";
    if (this.src) {
      script.src = this.src;
    }
    if (element.innerHTML) {
      script.innerHTML = element.innerHTML;
    }
    var parent = element.parentElement;
    parent.parentElement.replaceChild(script, parent);
  }

  ngAfterViewInit() {
    this.convertToScript();
  }
}
