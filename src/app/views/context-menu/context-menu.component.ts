import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $:any;
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
  @Input() contextmenuX = 0;
  @Input() contextmenuY = 0;
  @Output() colorCodeData = new EventEmitter<string>(); 
  closeResult: string;
  colorCode: string;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  private changeColor(content) {
      console.log("color changed function triggered");
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult =  result;
        this.sendToparent(result);
        this.getDismissReason("saved")
        console.log(this.closeResult)
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private sendToparent(color) {
    this.colorCodeData.emit(color);
  } 

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
