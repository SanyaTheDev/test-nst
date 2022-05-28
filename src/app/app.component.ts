import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertService } from "./shared/alert/alert.service";
import { ModalService } from "./shared/modal/modal.service";
import { Person } from "./core/models/person";
import { PersonService } from "./core/services/person.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidationService } from "./core/services/validation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  serverError: string;

  persons: Person[] = [];
  person: Person;

  form: FormGroup;

  constructor(
    private _personService: PersonService,
    private _formBuilder: FormBuilder,
    private _validationService: ValidationService,
    private _alertService: AlertService,
    private _modalService: ModalService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.getAllPersons();

    this.form = this._formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.maxLength(25)])],
      lastName: ['', Validators.compose([Validators.required, Validators.maxLength(25)])]
    })
  }

  getAllPersons() {
    this._personService.getAllPersons().subscribe({
      next: persons => {
        this.persons = persons.sort( (o1, o2) => {
          if (o1.lastName > o2.lastName) {
            return 1;
          }
          if(o1.lastName < o2.lastName) {
            return -1;
          }

          if (o1.firstName > o2.firstName) {
            return 1;
          }
          if (o1.firstName < o2.firstName) {
            return -1;
          }

          return 0;
        });
      },
      error: response => {
        this.serverError = (response.error && response.error.error_description) || response.message;
      }
    });
  }

  addPerson() {
    if (!this.form.valid) {
      this._validationService.validateAll(this.form);
      return;
    }

    const person = <Person> {
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value
    }

    this._personService.savePerson(person).subscribe({
      next: () => {
        this.getAllPersons();
        this.alertShow('success-add');
      },
      error: () => {
        this.alertShow('error-add');
      }
    });

    this.closeModalToAdd();
  }

  updatePerson(personId: number) {
    if (!this.form.valid) {
      this._validationService.validateAll(this.form);
      return;
    }

    const person = this.persons.find(x => x.id === personId);
    const p = <Person> {
      id: person.id,
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value
    }

    this._personService.savePerson(p).subscribe({
      next: () => {
        this.getAllPersons();
        this.alertShow('success-update');
      },
      error: () => {
        this.alertShow('error-update');
      }
    });

    this.closeModalToUpdate();
  }

  deletePerson(personId: number) {
    this._personService.deletePerson(personId).subscribe({
      next: () => {
        const indexToRemove = this.persons.findIndex(x => x.id === personId);
        this.persons.slice(indexToRemove, 1);
        this.getAllPersons();
        this.alertShow('success-remove');
      },
      error: () => {
        this.alertShow('error-remove');
      }
    });

    this.closeModalToDelete();
  }

  openModalToAdd() {
    this.form.controls['firstName'].setValue('');
    this.form.controls['lastName'].setValue('');
    this._modalService.open('add-person');
  }

  closeModalToAdd() {
    this._modalService.close('add-person');
  }

  openModalToUpdate(personId: number) {
    this.person = this.persons.find(x => x.id === personId);
    console.log(personId);
    console.log(this.person);
    this.form.controls['firstName'].setValue(this.person.firstName);
    this.form.controls['lastName'].setValue(this.person.lastName);
    this._modalService.open('update-person');
  }

  closeModalToUpdate() {
    this._modalService.close('update-person');
    this.person = null;
  }

  openModalToDelete(person: Person) {
    this.person = this.persons.find(x => x.id === person.id);
    this._modalService.open('delete-person');
  }

  closeModalToDelete() {
    this._modalService.close('delete-person');
    this.person = null;
  }

  alertShow(type: 'success-add' | 'success-update' | 'success-remove' | 'error-add' | 'error-update' | 'error-remove') {
    if (type === 'success-add') {
      this._alertService.alert({
        message: 'A new person has been successfully added!',
        type: 'success',
        autoClose: true
      });
    }
    if (type === 'success-update') {
      this._alertService.alert({
        message: 'Person has been successfully changed!',
        type: 'success',
        autoClose: true
      });
    }
    if (type === 'success-remove') {
      this._alertService.alert({
        message: 'Person was successfully deleted!',
        type: 'success',
        autoClose: true
      });
    }
    if (type === 'error-add') {
      this._alertService.alert({
        message: 'An error occurred when adding a new person!',
        type: 'danger',
        autoClose: false
      });
    }
    if (type === 'error-update') {
      this._alertService.alert({
        message: 'An error occurred while updating person!',
        type: 'danger',
        autoClose: false
      });
    }
    if (type === 'error-remove') {
      this._alertService.alert({
        message: 'An error occurred while deleting person!!',
        type: 'danger',
        autoClose: false
      });
    }
  }
}
