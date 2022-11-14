import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.pipe(first()).subscribe(({url}) => {
      window.location.href = url;
    })
  }

}
