import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsideStatusService } from 'src/app/services/aside-status.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {


  status: string;
  SEE = this.asideStatusService.SEE;
  CREATE = this.asideStatusService.CREATE;
  MODIFIE = this.asideStatusService.MODIFIE;


  constructor(
    private asideStatusService: AsideStatusService
  ) { }

  ngOnInit() {
    this.asideStatusService.get().subscribe(status => this.status = status);
  }
}
