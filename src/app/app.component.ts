import { Component } from '@angular/core';
import { ClassType, GameResult, PlayerType } from './@models/game';
import { GameApiService } from './@services/game-api.service';
import { Part } from './@services/Part.class';
import { PartManager } from './@services/PartManager.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private gameApiService: GameApiService,private PartManager:PartManager) {
  }

  ClassType = ClassType;
  PlayerType = PlayerType;
  GameResult = GameResult;
  botID = new Map<String, PlayerType>([["bot1", PlayerType.scissors], ["bot2", PlayerType.scissors]])
  gameResultString = new Map<GameResult, String>([[GameResult.Bot, "輸了!"], [GameResult.Draw, "和局!"], [GameResult.Player, "贏了!"]]);
  playerTypeString = new Map<PlayerType, String>([[PlayerType.scissors, "剪刀"], [PlayerType.rock, "石頭"], [PlayerType.paper, "布"]]);
  get lastBotPlayerType(): String {
    if (this.PartManager.parts.length == 1)
      return "Bot1"
    return this.playerTypeString.get(this.PartManager.parts[1].botsTypes[0])!;
  }
  get lastBotPlayerType2(): String {
    if (this.PartManager.parts.length == 1)
      return "Bot2"
    return this.playerTypeString.get(this.PartManager.parts[1].botsTypes[1])!;
  }
  get playerResult(): { resultString: String, gameResult: GameResult } {
    if (this.PartManager.parts.length == 1)
      return { resultString: "你好!點擊上方按鈕選擇出拳!", gameResult: GameResult.Draw }
    else if (this.PartManager.parts[1].winner.length == 0)
      return { resultString: "P1 和局", gameResult: GameResult.Draw }
    else if (this.PartManager.parts[1].winner.includes(this.PartManager.players[0]))
      return { resultString: "P1 Win", gameResult: GameResult.Player }
    else
      return { resultString: "P1 Lose", gameResult: GameResult.Bot }
  }
  get playerResult2(): { resultString: String, gameResult: GameResult } {
    if (this.PartManager.parts.length == 1)
      return { resultString: "你好!點擊上方按鈕選擇出拳!", gameResult: GameResult.Draw }
    if (this.PartManager.parts[1].winner.length == 0)
      return { resultString: "P2 和局", gameResult: GameResult.Draw }
    else if (this.PartManager.parts[1].winner.includes(this.PartManager.players[1]))
      return { resultString: "P2 Win", gameResult: GameResult.Player }
    else
      return { resultString: "P2 Lose", gameResult: GameResult.Bot }
  }
  get playerWinCount(): number {
    if (this.PartManager.players.length == 1) { return 0 } else
      return this.PartManager.players[0].winCount!;
  }
  get playerLoseCount(): number {
    if (PartManager.length == 1) { return 0 } else
      return this.PartManager.players[0].loseCount!;
  }
  get drawCount(): number {
    if (this.PartManager.players.length == 1) { return 0 } else
      return this.PartManager.players[0].drawCount!;
  }
  get playerWinCount2(): number {
    if (this.PartManager.players.length == 1) { return 0 } else
      return this.PartManager.players[1].winCount!!;
  }
  get playerLoseCount2(): number {
    if (this.PartManager.players.length == 1) { return 0 } else
      return this.PartManager.players[1].loseCount!;
  }
  get drawCount2(): number {
    if (this.PartManager.players.length == 1) { return 0 } else
      return this.PartManager.players[1].drawCount!;
  }
  get resultHistory(): Part[] {
    return this.PartManager.parts.slice(1, this.PartManager.parts.length);
  }
  Delete(index: number) {        //刪除按鈕
    this.resultHistory.splice(index, 1);
  }
  Reset() {          //重置按鈕
    this.gameApiService.CleanResultLog()
  }
  Play1(userType: PlayerType) {
    this.gameApiService.Play1(userType);
  }
  Play2(userType: PlayerType) {
    this.gameApiService.Play2(userType);
  }
}
