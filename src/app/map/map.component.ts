import { Component, AfterViewInit, ViewChild, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements AfterViewInit, OnChanges {
  fillcolor:String = "#ffe100";
  context:CanvasRenderingContext2D;
  imageUrl:string = require('../../assets/images/Layout.png');
  positionMap:Object = require('../../assets/data/positionMap.json');
  @Input()
  starPosition:string;

  @ViewChild("mapCanvas") mapCanvas;

  ngAfterViewInit() {
    var me = this;
    let canvas = me.mapCanvas.nativeElement;
    let img = new Image();
    img.onload = function(){
      me.context = canvas.getContext('2d');
      me.context.drawImage(img,0,0,img.width,img.height,0,0,canvas.height,canvas.width);
      me.tick();
    };
    img.src = this.imageUrl;
  }

  ngOnChanges(changes){
    if(changes.starPosition && !changes.starPosition.firstChange){
      this.drawStar(changes.starPosition.currentValue,this.context);
    }
  }

  // drawImageScaled(img, ctx) {
  //  var canvas = ctx.canvas ;
  //  var hRatio = canvas.width  / img.width    ;
  //  var vRatio =  canvas.height / img.height  ;
  //  var ratio  = Math.min ( hRatio, vRatio );
  //  var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
  //  var centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
  //  ctx.clearRect(0,0,canvas.width, canvas.height);
  //  ctx.drawImage(img, 0,0, img.width, img.height,
  //                     centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);  
  // }
  
  drawStar(pos,ctx){
    let coords = this.positionMap[pos];
    ctx.save();
    ctx.beginPath();
    ctx.translate(coords.x, coords.y);
    ctx.moveTo(0,0-20);
    for (var i = 0; i < 5; i++)
    {
        ctx.rotate(Math.PI / 5);
        ctx.lineTo(0, 0 - (20*0.5));
        ctx.rotate(Math.PI / 5);
        ctx.lineTo(0, 0 - 20);
    }
    ctx.fillStyle = this.fillcolor;
    ctx.fill();
    ctx.restore();
  }

  tick() {
    requestAnimationFrame(()=> {
      this.tick()
    });
  }
}