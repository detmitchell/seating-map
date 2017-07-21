import { Component, AfterViewInit, ViewChild, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {
  starPosition: string;
  starString: string;

  updateStarPosition(pos){
    this.starPosition = pos;
  }
}