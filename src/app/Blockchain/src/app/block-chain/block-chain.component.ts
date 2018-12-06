import { Component, OnInit } from '@angular/core';
import { BlockComponent } from '../block/block.component';
import { BlockChainOptionsComponent, BackendEnum } from 'src/app/block-chain-options/block-chain-options.component';
import { BlockChainDataComponent } from 'src/app/block-chain-data/block-chain-data.component';
import { MatDialog } from '@angular/material/dialog'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-block-chain',
  templateUrl: './block-chain.component.html',
  styleUrls: ['./block-chain.component.css']
})
export class BlockChainComponent implements OnInit {

  blockchain: BlockComponent[] = [];
  match: string = '000';
  maxTries: number = 1000000;
  backend: BackendEnum = BackendEnum.typescript;
  dialogResult: string;

  constructor(public dialog: MatDialog, private http: HttpClient) { }

  ngOnInit() {
  }

  newBlock(newData: string) {
    var block: BlockComponent = new BlockComponent(this.http);
    block.data = newData;
    if (this.blockchain.length !== 0) {
      block.parent = this.blockchain[this.blockchain.length - 1];
    } else {
      block.parent = block.defaultParent();
    }
    block.index = this.blockchain.length;
    block.hash = block.getHash();
    this.blockchain.push(block);
  }

  openOptions() {
    let dialogRef = this.dialog.open(BlockChainOptionsComponent, {
      height: '30%',
      width: '40%',
      data: [this.match, this.maxTries, this.backend],

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.match = result[0];
        this.maxTries = result[1];
        this.backend = result[2];
      }
    });
  }

  openData() {
    let dialogRef = this.dialog.open(BlockChainDataComponent, {
      height: '30%',
      width: '30%',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newBlock(result[0]);
      }
    });
  }
}
