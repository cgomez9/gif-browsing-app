import { Component, OnInit } from '@angular/core';
import { MessageService, AlertService } from '@/_services';
import { CoreService } from '@/_services/core.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  loading: boolean = false;

  constructor(
    private messageService: MessageService,
    private coreService: CoreService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.coreService.getFavoriteGIFs().subscribe(
      res => {
        this.sendMessage({ data: res, target : 'favorite' });
        this.loading = false;
      },
      err => {
        this.alertService.error("An unexpected error ocurred, please try again later")
      }
    );
  }

  sendMessage(message: any): void {
    // send message to subscribers via observable subject
    this.messageService.sendMessage(message);
  }

  clearMessages(): void {
      this.messageService.clearMessages();
  }

}
