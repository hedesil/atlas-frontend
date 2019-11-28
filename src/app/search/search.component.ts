import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {SearchService} from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private userIdSubject = new Subject<string>();

  readonly blogPosts$ = this.userIdSubject.pipe(
    debounceTime(250),
    distinctUntilChanged(),
    switchMap(userId => this.blogService.fetchPosts(userId))
  );

  constructor(private blogService: SearchService) {
  }

  ngOnInit() {
  }

  searchPosts(userId: string) {
    this.userIdSubject.next(userId);
  }
}
