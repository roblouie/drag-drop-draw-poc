import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  boxes = [{
    title: 'Test 1',
    text: 'some test text',
    config: {
      col: 0,
      row: 10,
      sizex: 1,
      sizey: 1
    }
  },
    {
      title: 'Test 2',
      text: 'more test text',
      config: {
        col: 0,
        row: 20,
        sizex: 1,
        sizey: 1
      }
    }

  ];

  constructor() { }

  ngOnInit() {
  }

}
