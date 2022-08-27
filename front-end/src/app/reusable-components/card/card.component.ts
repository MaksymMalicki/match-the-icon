import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Icon } from '../../shared-interfaces/icon.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent{
  @Input("cardIcons") public cardIcons: Icon[];
  @Output() selectedIcon: EventEmitter<Icon> = new EventEmitter<Icon>();

  public emitSelectedIcon(icon: Icon){
    this.selectedIcon.emit(icon);
  }
}
