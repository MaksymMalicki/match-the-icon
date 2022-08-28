import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {

  @Input('timerStart') timerStart$: BehaviorSubject<boolean>;
  private interval: ReturnType<typeof setInterval>;
  private subSink: Subscription = new Subscription();
  public time: number = 0;
  @Output() public gameFinalTimeEmitted: EventEmitter<number> = new EventEmitter<number>();

  public ngOnInit(): void {
    this.subSink.add(
      this.timerStart$.subscribe(
        res => {
          if (res) {
            this.interval = setInterval(
              () => {
                this.time++;
              }, 10,
            );
          } else {
            clearInterval(this.interval);
            this.gameFinalTimeEmitted.emit(this.time);
            this.time = 0;
          }
        }),
    )
    ;
  }

  public ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

}
