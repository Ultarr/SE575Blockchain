import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';

import { AppComponent } from './app.component';
import { BlockComponent } from './block/block.component';
import { BlockChainComponent } from './block-chain/block-chain.component';
import { BlockChainOptionsComponent } from './block-chain-options/block-chain-options.component';
import { BlockChainDataComponent } from './block-chain-data/block-chain-data.component';
import { RestResponseComponent } from './rest-response/rest-response.component';

@NgModule({
  declarations: [
    AppComponent,
    BlockComponent,
    BlockChainComponent,
    BlockChainOptionsComponent,
    BlockChainDataComponent,
    RestResponseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule
  ],
  entryComponents: [
    BlockChainOptionsComponent,
    BlockChainDataComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
