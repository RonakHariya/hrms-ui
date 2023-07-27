import { Component } from '@angular/core';
import { PopupContentComponent } from './modules/master/components/popup-content/popup-content.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'impDashboard';
  constructor(private dialog: MatDialog) {}

  openPopup() {
    this.dialog.open(PopupContentComponent, {
      width: '400px',
      data: { message: 'This is a custom message passed to the popup.' },
    });
  }
}
