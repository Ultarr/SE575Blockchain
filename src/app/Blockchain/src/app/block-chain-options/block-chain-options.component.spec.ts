import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockChainOptionsComponent } from './block-chain-options.component';

describe('BlockChainOptionsComponent', () => {
  let component: BlockChainOptionsComponent;
  let fixture: ComponentFixture<BlockChainOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockChainOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockChainOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
