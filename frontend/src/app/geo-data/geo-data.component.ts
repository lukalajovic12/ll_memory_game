import { Component } from '@angular/core';

import { CountryCapital, Continent, GeoObject, countriesList } from '../game-util';
import { AreaBase } from '../area-base';
@Component({
  selector: 'app-geo-data',
  templateUrl: './geo-data.component.html',
  styleUrls: ['./geo-data.component.scss']
})
export class GeoDataComponent extends AreaBase {

  countryCapitals:CountryCapital[]=[];

  private countries:{ [key: string]: string[][]; }={};
  continents: Continent[]=[];
  geoData:GeoObject[] =[];

  constructor() {
    super();
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


  


}
