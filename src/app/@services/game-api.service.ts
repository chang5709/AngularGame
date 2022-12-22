import { Injectable } from '@angular/core';
import { PlayerType } from 'src/app/@models/game';
import { PartManager } from './PartManager.class';

@Injectable({
  providedIn: 'root'
})

export class GameApiService {
  protected playerCount: number = 2       // 玩家人數判斷設定
  protected botCount: number = 2      //bot數設定
  constructor(private PartManager:PartManager) {
    //重置，new新的Part出來
    PartManager.Init(this.playerCount, this.botCount)
    PartManager.newPart()
  }

  Play1(type: PlayerType) {
    this.PartManager.TypePart(0, type)
  }

  Play2(type: PlayerType) {
    this.PartManager.TypePart(1, type)
  }

  CleanResultLog() {
    localStorage.clear();
    location.reload();
  }



}
