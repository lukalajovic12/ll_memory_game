
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UserService} from './user.service';
import {SettingsService} from './settings.service';

export const CIRCLES = 'circles';
export const SQUARES = 'squares';

export interface User {
  id:number,
  username:string,
}


export interface MemoryGame {
    id?:number,
    title:string,
    user:number
    points:number,
    settings:number,
    customGame:boolean,
    gameDate:string
  }
export interface Score {
  id:number,
  title:string,
  points:number,
  user:number,
  username:string,
  settings_id?:number,
  lives:number,
  mistakes:number,
  startLevel:number,
  startTime:number,
  timeIncrease:number
}

export interface Leaderboard {
  title:string,
  points:number,
  user:number,
  username:string,
  gameDate:string
}

export function saveData(title:string,gamePoints:number,customGame:boolean,
  http:HttpClient,
  _userService: UserService,
  _settingsService:SettingsService):void {

  let gameScore:MemoryGame = {title:title,
    user:_userService.user_id,
    points:gamePoints,
    settings: customGame && _settingsService.settings_id>0? _settingsService.settings_id:null,
    customGame:customGame,
    gameDate:new Date().toISOString()
  };

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${_userService.token}`
    })
  };  
    // Subscribe to the POST request to trigger it
    http.post<MemoryGame>(environment.BACKEND_URL+"api/memory_game/", gameScore, httpOptions).subscribe(
      (response) => {
        // Handle the response from the server (e.g., update your local todos)
        console.log('Game data saved:', response);
      },
      (error) => {
        // Handle errors here
        console.error('Error saving game data:', error);
      }
    );

  }

  export interface WindowSize { width: number, height: number }

  export function updateWindowSizes(): WindowSize {
    // Use Renderer2 to get the window size
    const width = window.innerWidth;
    const height = window.innerHeight-120;
    // Store the window size in your class property
    let maxSize=500;
    let svgWidth=Math.min(maxSize,width);
    let svgHeight=Math.min(maxSize,height);
    svgWidth>svgHeight?svgWidth=svgHeight:svgHeight=svgWidth


    return {width:svgWidth,height:svgHeight}
  }

  export function updateWindowWidth(): number {
    // Use Renderer2 to get the window size
    let sizes=updateWindowSizes();
    return Math.min(sizes.width,sizes.height);
  } 
 
  export function updateWindowHeight(): number {
    return window.innerHeight;
  } 


  export type GameDisplayState = 'game' | 'menu' | 'data' | 'empty' | 'end';

  export interface CountryCapital {
    country:string,
    capital:string
  }
  
  export type continent = 'asia'|'oceania'|'europe'|'afrika'|'north america' | 'south america';
  

   export const countriesList = {'asia': [ ['Afghanistan', 'Kabul'], ['Armenia', 'Yerevan'], ['Azerbaijan', 'Baku'], ['Bahrain', 'Manama'], ['Bangladesh', 'Dhaka'], ['Bhutan', 'Thimphu'], ['Brunei', 'Bandar Seri Begawan'], ['Cambodia', 'Phnom Penh'], ['China', 'Beijing'], ['East Timor', 'Dili'], ['Georgia', 'Tbilisi'], ['India', 'New Delhi'], ['Indonesia', 'Jakarta'], ['Iran', 'Tehran'], ['Iraq', 'Baghdad'], ['Israel', 'Tel Aviv'], ['Japan', 'Tokyo'], ['Jordan', 'Amman'], ['Kazakhstan', 'Astana'], ['Kuwait', 'Kuwait City'], ['Kyrgyzstan', 'Bishkek'], ['Laos', 'Vientiane'], ['Lebanon', 'Beirut'], ['Malaysia', 'Kuala Lumpur'], ['Maldives', 'Malé'], ['Mongolia', 'Ulaanbaatar'], ['Morocco', 'Rabat'], ['Myanmar', 'Naypyidaw'], ['Nepal', 'Kathmandu'], ['North Korea', 'Pyongyang'], ['Oman', 'Muscat'], ['Pakistan', 'Islamabad'], ['Palestine', 'East Jerusalem'], ['Papua New Guinea', 'Port Moresby'], ['Philippines', 'Manila'], ['Qatar', 'Doha'], ['Taiwan', 'Taipei'], ['Saudi Arabia', 'Riyadh'], ['Singapore', 'Singapore'], ['South Korea', 'Seoul'], ['Sri Lanka', 'Sri Jayawardenapura Kotte'], ['Syria', 'Damascus'], ['Tajikistan', 'Dushanbe'], ['Thailand', 'Bangkok'], ['Turkey', 'Ankara'], ['Turkmenistan', 'Ashgabat'], ['United Arab Emirates', 'Abu Dhabi'], ['Uzbekistan', 'Tashkent'], ['Vietnam', 'Hanoi'], ['Yemen', 'Sanaá']], 'europe': [['Albania', 'Tirana'], ['Andorra', 'Andorra la Vella'], ['Austria', 'Vienna'], ['Belarus', 'Minsk'], ['Belgium', 'Brussels'], ['Bosnia and Herzegovina', 'Sarajevo'], ['Bulgaria', 'Sofia'], ['Croatia', 'Zagreb'], ['Cyprus', 'Nicosia'], ['Czech Republic', 'Prague'], ['Denmark', 'Copenhagen'], ['Estonia', 'Tallinn'], ['Finland', 'Helsinki'], ['France', 'Paris'], ['Germany', 'Berlin'], ['Greece', 'Athens'], ['Hungary', 'Budapest'], ['Iceland', 'Reykjavík'], ['Ireland', 'Dublin'], ['Italy', 'Rome'], ['Kosovo', 'Pristina'], ['Latvia', 'Riga'], ['Liechtenstein', 'Vaduz'], ['Lithuania', 'Vilnius'], ['Luxembourg', 'Luxembourg'], ['North Macedonia', 'Skopje'], ['Malta', 'Valletta'], ['Moldova', 'Chisinau'], ['Monaco', 'Monaco'], ['Montenegro', 'Podgorica'], ['Netherlands', 'Amsterdam'], ['Northern Cyprus', 'Nicosia'], ['Northern Ireland', 'Belfast'], ['Norway', 'Oslo'], ['Poland', 'Warsaw'], ['Portugal', 'Lisbon'], ['Romania', 'Bucharest'], ['Russia', 'Moscow'], ['San Marino', 'San Marino'], ['Scotland', 'Edinburgh'], ['Serbia', 'Belgrade'], ['Slovakia', 'Bratislava'], ['Slovenia', 'Ljubljana'], ['Spain', 'Madrid'], ['Sweden', 'Stockholm'], ['Switzerland', 'Bern'], ['Ukraine', 'Kiev'], ['United Kingdom', 'London'], ['Vatican', 'Vatican'], ['Wales', 'Cardiff']], 'afrika': [['Algeria', 'Algiers'], ['Angola', 'Luanda'], ['Benin', 'Porto-Novo'], ['Botswana', 'Gaborone'], ['Burkina Faso', 'Ouagadougou'], ['Burundi', 'Bujumbura'], ['Cameroon', 'Yaoundé'], ['Cape Verde', 'Praia'], ['Central African Republic', 'Bangui'], ['Chad', "N'Djamena"], ['Comoros', 'Moroni'], ["Côte d'Ivoire", 'Yamoussoukro'], ['Democratic Republic of the Congo', 'Kinshasa'], ['Djibouti', 'Djibouti'], ['Egypt', 'Cairo'], ['Equatorial Guinea', 'Malabo'], ['Eritrea', 'Asmara'], ['Ethiopia', 'Addis Ababa'], ['Gabon', 'Libreville'], ['Gambia', 'Banjul'], ['Ghana', 'Accra'], ['Guinea', 'Conakry'], ['Guinea-Bissau', 'Bissau'], ['Kenya', 'Nairobi'], ['Lesotho', 'Maseru'], ['Liberia', 'Monrovia'], ['Libya', 'Tripoli'], ['Madagascar', 'Antananarivo'], ['Malawi', 'Lilongwe'], ['Mali', 'Bamako'], ['Mauritania', 'Nouakchott'], ['Mauritius', 'Port Louis'], ['Mozambique', 'Maputo'], ['Namibia', 'Windhoek'], ['Niger', 'Niamey'], ['Nigeria', 'Abuja'], ['Republic of the Congo', 'Brazzaville'], ['Rwanda', 'Kigali'], ['Senegal', 'Dakar'], ['Seychelles', 'Victoria'], ['Sierra Leone', 'Freetown'], ['Somalia', 'Mogadishu'], ['Somaliland', 'Hargeisa'], ['South Africa', 'Pretoria'], ['South Sudan', 'Juba'], ['Sudan', 'Khartoum'], ['Swaziland', 'Mbabane'], ['São Tomé and Príncipe', 'São Tomé'], ['Tanzania', 'Dodoma'], ['Togo', 'Lomé'], ['Tunisia', 'Tunis'], ['Uganda', 'Kampala'], ['Western Sahara', 'El Aaiún'], ['Zambia', 'Lusaka'], ['Zimbabwe', 'Harare']], 'north america': [['Antigua and Barbuda', "St. John's"], ['Bahamas', 'Nassau'], ['Barbados', 'Bridgetown'], ['Belize', 'Belmopan'], ['Canada', 'Ottawa'], ['Costa Rica', 'San José'], ['Cuba', 'Havana'], ['Dominica', 'Roseau'], ['Dominican Republic', 'Santo Domingo'], ['El Salvador', 'San Salvador'], ['Grenada', "St. George's"], ['Guatemala', 'Guatemala City'], ['Haiti', 'Port-au-Prince'], ['Honduras', 'Tegucigalpa'], ['Jamaica', 'Kingston'], ['Mexico', 'Mexico City'], ['Nicaragua', 'Managua'], ['Panama', 'Panama City'], ['Saint Kitts and Nevis', 'Basseterre'], ['Saint Lucia', 'Castries'], ['Trinidad and Tobago', 'Port of Spain'], ['United States', 'Washington.D.C.']], 'south america': [['Argentina', 'Buenos Aires'], ['Bolivia', 'La Paz'], ['Brazil', 'Brasília'], ['Chile', 'Santiago'], ['Colombia', 'Bogotá'], ['Ecuador', 'Quito'], ['Guyana', 'Georgetown'], ['Paraguay', 'Asunción'], ['Peru', 'Lima'], ['Suriname', 'Paramaribo'], ['Uruguay', 'Montevideo'], ['Venezuela', 'Caracas']], 'oceania': [['Australia', 'Canberra'], ['Federated States of Micronesia', 'Palikir'], ['Fiji', 'Suva'], ['Kiribati', 'Tarawa'], ['Marshall Islands', 'Majuro'], ['Nauru', 'Yaren'], ['New Zealand', 'Wellington'], ['Palau', 'Ngerulmud'], ['Samoa', 'Apia'], ['Solomon Islands', 'Honiara'], ['Tonga', 'Nukuʻalofa'], ['Tuvalu', 'Funafuti'], ['Vanuatu', 'Port Vila']]};
 
   export const countriesList2 = {'abcde': [['a', 'a'],['b','b'],['c','c'],['d','d'],['e','e']]};

  export interface GeoObject {
    country: string,
    capital: string,
    continent: string
  }
  
  export interface Continent {
    continent: string,
    selected:boolean
  }

  export interface GeoAnwser {
    countryCorrect: GeoObject,
    countryAnwsered:GeoObject
  }