import { Component, HostListener, OnInit } from '@angular/core';
import { updateWindowWidth,updateWindowHeight } from '../game-util';

import { CountryCapital, Continent, GeoObject, countriesList } from '../game-util';

@Component({
  selector: 'app-geo-data',
  templateUrl: './geo-data.component.html',
  styleUrls: ['./geo-data.component.scss']
})
export class GeoDataComponent implements OnInit {
  private windowWidth: number; 
  private windowHeight: number; 


  countryCapitals:CountryCapital[]=[];


  private countries:{ [key: string]: string[][]; }={};
  continents: Continent[]=[];
  geoData:GeoObject[] =[];

  constructor() {
    this.countries=countriesList;

    this.continents=this.getContinents();
    this.continents=this.getContinents();
    this.getGeoData();
  }



   getGeoData():void {
    this.geoData=[];
    for(let con of this.continents) {
      if(con.selected){
        for(let c of this.countries[con.continent]) {
          let g:GeoObject ={country:con.continent,capital:c[0],continent:c[1]};
          this.geoData.push(g);
        }
      }
    }
  }

  private getContinents():Continent[] {
    let list:Continent[] =[];
    for(let key in this.countries){
      list.push({continent:key,selected:false});
    }
  
    return list;
  }


  ngOnInit() {
    this.windowWidth = updateWindowWidth();
    this.windowHeight = updateWindowHeight();

  }

  protected sidesWidth():number {
    let width = window.innerWidth;
    return (width-this.windowWidth)/2;
  }

  protected sidesHeight():number {
    let height = window.innerHeight;
    return (height-this.windowHeight)/2;
  }   

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = updateWindowWidth();
    this.windowHeight = updateWindowHeight();
  }  



}
