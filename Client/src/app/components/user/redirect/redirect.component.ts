import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private route  : ActivatedRoute,private router : Router, private auth : AuthService) { }


  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      first(),
      concatMap(params => {
        const code = params.get('code') ?? ''; 
        return this.auth.getAccessToken(code);
      })
      ).subscribe(data => {
      this.router.navigate(['/info'])
    })
  }

}
