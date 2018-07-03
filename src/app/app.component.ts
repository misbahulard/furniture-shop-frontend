import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  searchForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      keyword: ['']
    });
  }

  onSubmit() {
    var keyword = this.searchForm.value.keyword;
    var url = "search/" + keyword;
    this.router.navigate([url]);
  }
}
