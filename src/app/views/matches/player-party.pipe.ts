import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playerParty'
})
export class PlayerPartyPipe implements PipeTransform {

  transform(players: Player[], ...args: any[]): any {
    return players.map(p => p.nickName).join(' & ');
  }

}
