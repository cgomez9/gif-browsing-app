import { Component, OnInit } from '@angular/core';
import { CoreService } from '@/_services/core.service';
import { AlertService } from '@/_services';
import { SearchHistory } from '@/_models';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  searchHistory: SearchHistory[] = [];

  constructor(
    private coreService: CoreService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.coreService.getSearchHistory().subscribe(
      res => {
        this.searchHistory = res as SearchHistory[];
      },
      err => {
        this.alertService.error("An unexpected error ocurred, please try again later")
      }
    );
  }

}
