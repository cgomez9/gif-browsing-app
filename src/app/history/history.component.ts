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
  loading: boolean = false;
  loaded: boolean = false;

  constructor(
    private coreService: CoreService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.coreService.getSearchHistory().subscribe(
      res => {
        this.searchHistory = res as SearchHistory[];
        this.loading = false;
        this.loaded = true;
      },
      err => {
        this.alertService.error("An unexpected error ocurred, please try again later")
      }
    );
  }

}
