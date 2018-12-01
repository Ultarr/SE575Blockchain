import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockChainDataComponent } from './block-chain-data.component';

describe('BlockChainDataComponent', () => {
  let component: BlockChainDataComponent;
  let fixture: ComponentFixture<BlockChainDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockChainDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockChainDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
