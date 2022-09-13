import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',

})
export class SidebarComponent {

  get history() {
    return this.GifsService.history;
  }

  constructor(private GifsService: GifsService) {

    console.log(history);
  }


}
