
export class GameClass {   
    win = 0;
    draw = 0;
    lose = 0;
    constructor(win: number, draw: number, lose: number) {
        this.win = win;
        this.draw =draw;
        this.lose = lose;
    }
}
export class test extends GameClass  {
    constructor(win: number,draw: number, lose: number) {
        super(win,draw,lose);
   
    }
}