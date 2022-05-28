import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

let nextId = 0;

@Component({
	selector: 'app-form-group-text',
	templateUrl: './form-group-text.component.html'
})
export class FormGroupTextComponent {
	@Input() id = `app-form-group-text-${nextId++}`;
	@Input() label = '';
	@Input() control: FormControl;
	@Input() placeholder = '';
	@Input() isReadonly = false;
	@Input() type = 'text';
}
