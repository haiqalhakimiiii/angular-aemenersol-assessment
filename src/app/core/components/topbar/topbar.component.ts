import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  constructor(private router: Router, private storageService: StorageService) { }

  protected logout(): void {
    this.storageService.removeAccessToken();
    this.router.navigate(['/login']);
  }
}
