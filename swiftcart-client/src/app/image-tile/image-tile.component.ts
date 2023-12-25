import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-tile',
  templateUrl: './image-tile.component.html',
  styleUrls: ['./image-tile.component.scss']
})
export class ImageTileComponent implements OnInit {

  @Input() imageUrl:string = '';
  @Input() title:string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
