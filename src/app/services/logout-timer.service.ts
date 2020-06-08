import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutTimerService {

    private tt:number = 0;
    private ta:number = 0;
    private ir:boolean = false;

    constructor() {}

    get tempoTotal(){
        return this.tt;
    }
    set tempoTotal( t:number ){
        this.tt = t;
    }

    get tempoAtual(){
        return this.ta;
    }
    set tempoAtual( tempo:number ){
        this.ta = tempo;
    }

    start(){
        this.ir = true;
    }
    stop(){
        this.ir = false;
    }
    get isRunning(){
        return this.ir;
    }
}
