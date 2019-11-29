import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {
  isModalVisible: boolean;
  descSort;
  testsList;
  total;
  constructor() {
  }

  ngOnInit() {
  }

  deleteTest(test) {
  }

}
