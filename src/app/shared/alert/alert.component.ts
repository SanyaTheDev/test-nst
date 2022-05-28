import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AlertService } from './alert.service';

@Component({
	selector: 'app-alert',
	templateUrl: 'alert.component.html',
	styleUrls: ['./alert.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent {

	constructor(public alertService: AlertService) {}

}

