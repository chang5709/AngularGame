import { Injectable } from "@angular/core"
import { PlayerType } from "../@models/game"
import { Part } from "./Part.class"
import { PlayerInfo } from "./PlayerInfo.class"

@Injectable({
  providedIn: 'root'
})

export class PartManager {
  playerCount = 0
  botCount = 0
  parts: Part[] = []
  players: PlayerInfo[] = []

  getPartsFromStorage() {
    let storageJson = localStorage.getItem('logData')
    if (storageJson != undefined) {
      let storageTamp = JSON.parse(storageJson)

      //抓storage時需要先new出紀錄數量的part再把值加進去

      for(let i = 0; i< storageTamp.saveList.length; i++){
        console.log(this.parts);
        this.parts[i].list = new Map<PlayerInfo, PlayerType>(storageTamp.saveList[i])
      }
    }
  }

  savePartsToStorage() {
    let listArray = []
    for (var i = 0; i < this.parts.length; i++) {
      listArray.push([...this.parts[i].list.entries()])
    }
    let storage = {
      savePart: this.parts,
      saveList: listArray
    }
    console.log(this.parts);
    let logJSON = JSON.stringify(storage);
    localStorage.setItem('logData', logJSON);
  }

  Init(playerCount: number, botCount: number) {
    this.playerCount = playerCount;
    this.botCount = botCount;
    //TODO:待改
    // this.getPartsFromStorage()

    for (let index = 0; index < this.playerCount; index++)
      //開局new出玩家數的PlayerInfo
      this.players.push(new PlayerInfo("player" + (index+1)))
  }
  newPart() {
    this.parts.unshift(new Part(this.playerCount, this.botCount))

    if (this.parts.length > 6)        //限制對戰紀錄上限5個
    this.parts.pop();
  }
  get nowPart(): Part {
    return this.parts[0]
  }
  TypePart(num: number, type: PlayerType) {
    this.nowPart.add(this.players[num], type)
    if (this.nowPart.isSettle) {

        this.savePartsToStorage()
        this.newPart()
    }
  }
}
