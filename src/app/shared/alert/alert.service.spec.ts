import { AlertService } from './alert.service';
import { Scheduler } from 'jest-marbles';
import { Alert } from './alert.model';

describe('Alert Service', () => {
	it(`should add and remove alerts correctly`, () => {
		const service = new AlertService();
		const testAlerts: Record<string, Alert> = {
			1: {
				type: 'success',
				message: '1'
			},
			2: {
				type: 'danger',
				message: '2',
				autoClose: true
			},
		};
		const testEvents = {
			1: testAlerts[1],
			2: testAlerts[2],
			r: 'remove'
		};
		const expectedAlerts = {
			0: [],
			1: [testEvents[1]],
			2: [testEvents[1], testEvents[2]]
		};

		Scheduler.get().run(({ cold, expectObservable }) => {
			const testEvents$ = cold(' - 10ms 1 10ms 2 2999ms - 10ms r', testEvents);
			const expectedAlertsMarbles = '   0 10ms 1 10ms 2 2999ms 1 10ms 0';
			testEvents$.subscribe(event => {
				if (typeof event === 'string') {
					service.removeAlert(testAlerts[1]);
				} else {
					service.alert(event);
				}
			});
			expectObservable(service.alerts$).toBe(expectedAlertsMarbles, expectedAlerts);
		});
	});
});
