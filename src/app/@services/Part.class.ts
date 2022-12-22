import { PlayerType } from "../@models/game";
import { PlayerInfo } from "./PlayerInfo.class";

export class Part {

  //發散到收斂
  // players Count + bot Count
  totalPlayers = 0
  //機器人亂數猜拳使用
  private static months = [PlayerType.scissors, PlayerType.rock, PlayerType.paper];
  public win_type!: PlayerType
  public isSettle: boolean = false
  //出剪刀、出石頭、出布 的玩家資訊
  public list: Map<PlayerInfo, PlayerType> = new Map<PlayerInfo, PlayerType>();
  //玩家資訊、出了什麼

  //這樣寫是因為 app.component 畫面設計關係，為了先讓畫面呈現出來所以暫時這樣寫
  //但是這樣寫是不好的 因為同樣意義的資料  在多個地方儲存

  get winner(): PlayerInfo[] {
    return this.getPlayerOfType(this.winType)
  }

  set winType(winType: PlayerType) {
    this.win_type = winType;
    this.isSettle = true;
  }
  get winType(): PlayerType {
    return this.win_type;
  }

  getPlayerOfType(inPlayerType: PlayerType): PlayerInfo[] {
    //出了這個拳的有誰
    let types: PlayerInfo[] = [];
    this.list.forEach((playerType, playerInfo) => {
      if (playerType == inPlayerType)
        types.push(playerInfo)
    });
    return types;
  }
  get playerTypes(): PlayerType[] {
    //拿玩家出了什麼
    let types: PlayerType[] = [];
    this.list.forEach((playerType, playerInfo) => {
      if (!playerInfo.isBot)
        types.push(playerType)
    });
    return types;
  }
  get botsTypes(): PlayerType[] {
    //拿BOT出了什麼
    let types: PlayerType[] = [];
    this.list.forEach((playerType, playerInfo) => {
      if (playerInfo.isBot)
        types.push(playerType)
    });
    return types;
  }

  constructor(playerCount: number, botCount: number) {
    this.totalPlayers = playerCount + botCount;
    for (let index = 0; index < botCount; index++) {
      //開局執行botCount次數的猜拳並執行add
      this.addBot(new PlayerInfo("bot" + (index+1), true))
    }
    // this.GetFromStorage()
  }

  private addBot(player: PlayerInfo) {
    let temp = Part.months[Math.floor(Math.random() * 3)]
    this.add(player, temp)
  }

  //參數:玩家資訊，出了什麼
  add(player: PlayerInfo, type: PlayerType) {
    if (this.list.has(player))
      return;
    this.list.set(player, type)
    //將資料放進list陣列，陣列長度 = 玩家總數 =>開始
    if (this.list.size == this.totalPlayers)
      this.settle();
  }

  isDraw() {
    let playersOfScissors: PlayerInfo[] = this.getPlayerOfType(PlayerType.scissors)
    let playersOfRock: PlayerInfo[] = this.getPlayerOfType(PlayerType.rock)
    let playersOfPaper: PlayerInfo[] = this.getPlayerOfType(PlayerType.paper)
    //全都出相同
    if (playersOfScissors.length == this.totalPlayers || playersOfRock.length == this.totalPlayers || playersOfPaper.length == this.totalPlayers)
      return true;
    //都有出現
    if (playersOfScissors.length >= 1 && playersOfRock.length >= 1 && playersOfPaper.length >= 1)
      return true;
    return false;
  }

  settle() {
    if (this.isDraw()) {
      this.list.forEach(function (value, key) {
        key.incrementDrawCount();
      });
      this.isSettle = true;
      return;
    }
    let playersOfScissors: PlayerInfo[] = this.getPlayerOfType(PlayerType.scissors)
    let playersOfRock: PlayerInfo[] = this.getPlayerOfType(PlayerType.rock)
    let playersOfPaper: PlayerInfo[] = this.getPlayerOfType(PlayerType.paper)
    if (playersOfScissors.length >= 1 && playersOfRock.length >= 1)
      //情況為只有出剪刀與石頭、出石頭的贏
      this.winType = PlayerType.rock;
    else if (playersOfRock.length >= 1 && playersOfPaper.length >= 1)
      //情況為只有石頭與布、出布的贏
      this.winType = PlayerType.paper;
    else
      //剩下剪刀與布的情況、出剪刀的贏
      this.winType = PlayerType.scissors;

    this.winner.forEach(element => {
      element.incrementWinCount();
    });
    let PlayerTypeLength = Object.keys(PlayerType).length / 2;
    //取得PlayerType Enum長度
    for (let index = 0; index < PlayerTypeLength; index++) {
      //出了不是winType的就是輸
      if (this.winType != index) {
        this.getPlayerOfType(index).forEach(element => {
          element.incrementLoseCount();
        })
      }
    }
  }
}

