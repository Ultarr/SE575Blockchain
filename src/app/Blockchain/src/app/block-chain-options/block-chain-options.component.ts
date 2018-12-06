import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatSelect, MAT_DIALOG_DATA } from '@angular/material';

export interface Backend {
  value: BackendEnum;
  viewValue: string;
}

export enum BackendEnum {
  typescript = "Typescript",
  java = "Java"
}

@Component({
  selector: 'app-block-chain-options',
  templateUrl: './block-chain-options.component.html',
  styleUrls: ['./block-chain-options.component.css']
})
export class BlockChainOptionsComponent implements OnInit {

  match: string = "000";
  maxTries: number = 1000000;
  backend: BackendEnum = BackendEnum.typescript;

  constructor(public thisDialogRef: MatDialogRef<BlockChainOptionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [string, number, BackendEnum],
    @Inject(MAT_DIALOG_DATA) public currentMaxTries: number) {
    this.match = data[0];
    this.maxTries = data[1];
    this.backend = data[2];
  }

  ngOnInit() {
  }

  onClose(saved?: boolean) {
    if (saved) {
      let result: [string, number, BackendEnum];
      result = [this.match, this.maxTries, this.backend];
      this.thisDialogRef.close(result);
    }
    else {
      this.thisDialogRef.close();
    }
  }

}
