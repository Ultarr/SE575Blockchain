import { Component, OnInit } from '@angular/core';
import { sha256 } from 'js-sha256';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BackendEnum } from 'src/app/block-chain-options/block-chain-options.component';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {

    parent: BlockComponent;
	  id: string = this.generateId(32);
	  data: string;
    nonce: number = 0;
    hash: string;
    solveTime: number = 0;
    index: number;
    status: string = "Bad";
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  reHash(match: string) {
    this.hash = this.getHash();
    if (this.isSolved(match)) {
      this.status = "Good";
    } else {
      this.status = "Bad";
    }
  }

  solve(backend: BackendEnum, match: string, maxTries: number) {
    var start = performance.now();
    this.status = "Bad";
    if (backend === BackendEnum.java) {
      this.http.post('http://localhost:8080', "Match:" + match + "\nMaxTries:" + maxTries.toString() + "\nHash:" + this.getHashInput() + "\n", {responseType: 'text'}).subscribe(res => this.getResponse(+res, match), error => console.log(error));
    } else if (backend === BackendEnum.typescript) {
      for (this.nonce = 0; this.nonce<maxTries; this.nonce++) {
        this.reHash(match);
        if (this.hash.lastIndexOf(match, 0) === 0) {
          this.status = "Good";
          break;
        }
      }
    }
    this.solveTime = Math.floor(performance.now() - start);
  }

  generateId(length: number = 0): string {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for(var i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
  }

  getHash(): string {
    var hashinput: string;
    hashinput = this.getHashInput().concat(this.nonce.toString());

    var hashcode = sha256.create();
    hashcode.update(hashinput);
    return hashcode.hex();
  }

  isSolved(match: string): boolean {
    if (this.index == -1) {
      return true;
    }
    return this.hash.lastIndexOf(match, 0) === 0 && this.parent.isSolved(match);
  }

  defaultParent(): BlockComponent {
    var block: BlockComponent = new BlockComponent(this.http);
    block.hash = "00000000000000000000000000000000";
    block.index = -1;
    return block;
  }

  getHashInput(): string { 
    return this.id.concat(this.parent.hash).concat(this.data);
  }

  getResponse(response: number, match: string) {
    this.nonce = response;
    this.reHash(match);
    if (this.hash.lastIndexOf(match, 0) === 0) {
      this.status = "Good";
    }
  }
}
