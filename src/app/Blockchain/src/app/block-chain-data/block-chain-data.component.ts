import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-block-chain-data',
  templateUrl: './block-chain-data.component.html',
  styleUrls: ['./block-chain-data.component.css']
})
export class BlockChainDataComponent implements OnInit {

  data: string;

  constructor(public thisDialogRef: MatDialogRef<BlockChainDataComponent>) {}

  ngOnInit() {
  }

  onClose(saved?: boolean) {
    if (saved) {
      let result: [string, boolean];
      result = [this.data, saved];
      this.thisDialogRef.close(result);
    }
    else {
      this.thisDialogRef.close();
    }
  }
}
