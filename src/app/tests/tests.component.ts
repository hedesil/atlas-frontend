import {Component, OnInit} from '@angular/core';

export interface Test {
  name: string;
  description: string;
}

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
  newTest: Test = {description: "", name: ""};

  constructor() {

  }

  ngOnInit() {
  }

  deleteTest(test) {
  }

  closeModal() {
    this.isModalVisible = false;
    this.newTest = {
      name: '',
      description: ''
    };
  }

  addTest() {

  }
}
