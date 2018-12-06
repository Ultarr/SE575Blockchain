import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rest-response',
  templateUrl: './rest-response.component.html',
  styleUrls: ['./rest-response.component.css']
})
export class RestResponseComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}
