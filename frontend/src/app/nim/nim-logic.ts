

export interface Line {
    x: number,
    y: number,
    choosen:boolean
  }


function numberToBinaryString(num: number): string {
    return num.toString(2);
}

function transformToBinary(p:number[]):String[]{
    let st:String[]=[];
    let maks=0;
    let a=0;
    while(a<p.length){
        let v=p[a];
        let s= numberToBinaryString(v);
        if(s.length>maks){
            maks=s.length;
        }
        st.push(s);
        a+=1;
    }

    let stanje:String[]=[];
    for(let i=0;i<st.length;++i){
        let s=st[i];
        let dodaj=Math.abs(s.length-maks);
        let ss=s;
        if(dodaj!=0){
            let b=0;
            while(b<dodaj){
                ss="0"+ss;
                b+=1;
            }

        }
        stanje.push(ss);

    }
    return stanje;
}

 export function evenPosition( lines:Line[][]):boolean{
    let stanje=transformToBinary(lines.map(l=>l.length));
    let sodo=true;
    for(let j=0;j<stanje[0].length;++j){
        let vsota=0;
        for(let i=0;i<stanje.length;++i){
            let s=stanje[i];
            if(s.charAt(j)=='1'){
                vsota=1-vsota;
            }
        }
        if(vsota!=0){
            sodo=false;
            break;
        }
    }
    return sodo;
}

export function evenPositionNumbers( stevila:number[]):boolean{
    let stanje=transformToBinary(stevila);
    let sodo=true;
    for(let j=0;j<stanje[0].length;++j){
        let vsota=0;
        for(let i=0;i<stanje.length;++i){
            let s=stanje[i];
            if(s.charAt(j)=='1'){
                vsota=1-vsota;
            }
        }
        if(vsota!=0){
            sodo=false;
            break;
        }
    }
    return sodo;
}

export function  randomMove(lines:Line[][]):void{
    let a=Math.floor(lines.length+Math.random());
    let b=Math.floor(lines[a].length+Math.random());
    lines[a][b].choosen=true;
}

export function  oddMove( lines:Line[][]):void {
    let stevila:number[]=[];
    for(let c in lines){
        stevila.push(c.length);
    }
    for(let i=0;i<stevila.length;++i){
        let ste=stevila[i];
        let zac=stevila[i];
        let koncano=false;
        while(0<=ste){
            stevila[i]=ste;
            if(evenPositionNumbers(stevila)==true){
                for(let x=0;x<lines[i].length-ste;++x){
                    lines[i][x].choosen=true;
                }
                koncano=true;
                break;
            }
            ste-=1;
        }
        if(koncano==true){
            break;
        }
        else{
            stevila[i]=zac;
        }

    }
    for(let j=0;j<stevila.length;++j){
        let c=lines[j];
        if(c.length>stevila[j]){
            for(let k=0;k<c.length-stevila[j];++k){
                c[k].choosen=true;
            }
        }
    }

}
