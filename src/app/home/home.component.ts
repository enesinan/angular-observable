import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscripton: Subscription;

  constructor() { }

  ngOnInit() {
    /*this.firstObsSubscripton = interval(1000).subscribe( count =>{
      console.log(count);
    })*/
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
       setTimeout(() =>{
        if(count === 2){
          observer.complete()
        }
        if(count > 3) {
          observer.error(new Error(' count greater than 3'))
        }
        observer.next(count);
        count++;
       },1000)
    });

    customIntervalObservable.pipe(map((data) => {
     // return 'Round: ' + (data + 1);
    }));

   this.firstObsSubscripton = customIntervalObservable.subscribe(data => {
      console.log(data)
    },error => {
      console.log(error);
    });
  }
  ngOnDestroy(): void {
    this.firstObsSubscripton.unsubscribe()
  }

}
