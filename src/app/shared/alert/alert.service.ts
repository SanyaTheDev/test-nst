import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Alert } from './alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
	private _alerts$ = new BehaviorSubject<readonly Alert[]>([]);
	private _alertsToRemove$ = new Subject<Alert>();
	alerts$: Observable<readonly Alert[]> = this._alerts$;

	constructor() {
		this._alertsToRemove$.pipe(delay(3000)).subscribe(alert => this.removeAlert(alert));
	}

	alert(alert: Alert) {
		const alertsUpd = [...this._alerts$.value, alert];
		this._alerts$.next(alertsUpd);
		if (alert.autoClose) {
			this._alertsToRemove$.next(alert);
		}
	}

	removeAlert(alert: Alert) {
		this._alerts$.next(this._alerts$.value.filter(x => x !== alert));
	}
}
