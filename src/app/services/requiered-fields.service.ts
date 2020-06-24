import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequieredFieldsService {
  initialRequierdFields = {
    date : false,
    nature : false,
    amount : false
  };

  requierdFields = new BehaviorSubject<object>(this.initialRequierdFields);

  constructor() { }

  changeField(field: string, isCorrectlyFilled: boolean) {
    let requieredFields;
    this.requierdFields
        .asObservable()
        .subscribe((rfs) => {
          requieredFields = rfs;
        });
    for (const rf in requieredFields) {
      if (requieredFields.hasOwnProperty(rf)) {
        if (field === rf) {
          requieredFields[rf] = isCorrectlyFilled;
        }
      }
    }
    this.requierdFields.next(requieredFields);
  }

  areRfsFilledCorrectly(): Observable<boolean> {
    return this.requierdFields
                .asObservable()
                .pipe(
                  map((rfs: any) => {
                    for (const rf in rfs) {
                      if (rfs.hasOwnProperty(rf)) {
                        if (!rfs[rf]) {
                          return false;
                        }
                      }
                    }
                    return true;
                  })
                );
  }
}
