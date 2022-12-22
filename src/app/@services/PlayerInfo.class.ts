export class PlayerInfo {
  public isBot: boolean
  public name: string
  public winCount = 0
  public loseCount = 0
  public drawCount = 0
  incrementWinCount(){
    this.winCount++
    this.SaveToStorage()
  }
  incrementLoseCount(){
    this.loseCount++
    this.SaveToStorage();
  }
  incrementDrawCount(){
    this.drawCount++
    this.SaveToStorage();
  }
  constructor(name: string, isbot: boolean = false) {
    this.name = name;
    this.isBot = isbot;
    this.getFromStorage()
  }
  getFromStorage() {
    let storageJson = localStorage.getItem(this.name + "Data")
    if (storageJson != undefined) {
      let playerInfo = JSON.parse(storageJson)
      this.winCount = playerInfo.winCount;
      this.loseCount = playerInfo.loseCount;
      this.drawCount = playerInfo.drawCount;
    } else {
      this.SaveToStorage();
    }
  }
  SaveToStorage() {
    let logJSON = JSON.stringify(this);
    localStorage.setItem(this.name + "Data", logJSON);
  }

}
