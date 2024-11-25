import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, ValidationErrors, AbstractControl, AbstractControlOptions } from '@angular/forms';
import { Validators } from '@angular/forms';
import { lettersAndSpacesValidator } from '../shared/user-name.validator';
import { passwordValidator } from '../shared/password.validator';
import { FormDataService } from '../services/services/form-data.service';
import { DefaultValues } from '../models/default-values';
import { emailValidator } from '../shared/email.validator';
import { noDuplicateDebitSitesValidator } from '../shared/duplicatedebit-site.validator';
import { errorMessages } from '../Error-messages/error-messages';
  
  
  
  @Component({
    selector: 'app-student-form',
    templateUrl: './student-form.component.html',
    styleUrl: './student-form.component.css',
  })
  export class StudentFormComponent implements OnInit {
    constructor(private fb: FormBuilder, private service: FormDataService) {
      this.loadRecords();
    }

    searchId: any;
    registrationForm!: FormGroup;
    formRecords: any[] = [];
    isNewRecord: boolean = true;
    formVisible: boolean = false;
    initialFormState: any;
    defaultValues: DefaultValues = new DefaultValues();
    show: any = false;
    errorMessages = errorMessages;

    focusNext(event: any, nextField: HTMLElement): void {
      if (event.key === 'Enter') {
        nextField.focus();
        event.preventDefault();
      }
    }

    getName() {
      return this.registrationForm.get('name');
    }

    getEmail() {
      return this.registrationForm.get('email');
    }

    addAlternativeEmail(): void {
      const control = this.fb.control('', emailValidator()); // Validate new email
      this.getAlternativeEmail().push(control);
    }

    removeAlternativeEmail(index: number): void {
      this.getAlternativeEmail().removeAt(index);
    }

    getAlternativeEmail() {
      return this.registrationForm.get('alternativeEmails') as FormArray;
    }

    //below for error management

    getFormControlError(controlName: string, errorType: string): string | null {
      const control = this.registrationForm.get(controlName);
      if (
        control &&
        control?.hasError(errorType) &&
        (control.dirty || control.touched)
      ) {
        return this.errorMessages[
          `${controlName}${errorType.charAt(0).toUpperCase()}${errorType.slice(
            1
          )}`
        ];
      }
      return null;
    }
    // getNameError(): string | null {
    //   return (
    //     this.getFormControlError('name', 'required') ||
    //     this.getFormControlError('name', 'minlength') ||
    //     this.getFormControlError('name', 'invalidName')
    //   );
    // }
    getNameError(): string | null {
      const control = this.registrationForm.get('name');
      if ((control && control.dirty) || control?.touched) {
        if (control?.hasError('required')) {
          return this.errorMessages['nameRequired'];
        }
        if (control?.hasError('minlength')) {
          return this.errorMessages['nameMinLength'];
        }
        if (control?.hasError('invalidName')) {
          return this.errorMessages['invalidName'];
        }
      }
      return null;
    }
    getEmailError(): string | null {
      const control = this.registrationForm.get('email');
      if ((control && control.dirty) || control?.touched) {
        if (control?.hasError('required')) {
          return this.errorMessages['emailRequired'];
        }
        if (control?.hasError('invalidEmail')) {
          return this.errorMessages['invalidEmail'];
        }
      }
      return null;
    }
    getPasswordError(): string | null {
      const control = this.registrationForm.get('password');
      if ((control && control.dirty) || control?.touched) {
        if (control?.hasError('required')) {
          return this.errorMessages['passwordRequired'];
        }
        if (control?.hasError('minlength')) {
          return this.errorMessages['passwordMinLength'];
        }
      }
      return null;
    }
    getConfirmPasswordError(): string | null {
      const control = this.registrationForm.get('confirmPassword');
      if ((control && control.dirty) || control?.touched) {
        if (control?.hasError('required')) {
          return this.errorMessages['confirmPasswordRequired'];
        }
        if (this.registrationForm.hasError('misMatch')) {
          return this.errorMessages['misMatch'];
        }
      }
      return null;
    }
    getIdError(): string | null {
      const control = this.registrationForm.get('id');
      if ((control && control.dirty) || control?.touched) {
        if (control?.hasError('required')) {
          return this.errorMessages['idRequired'];
        }
      }
      return null;
    }
    getGenderError(): string | null {
      const control = this.registrationForm.get('gender');
      if ((control && control.dirty) || control?.touched) {
        if (control?.hasError('required')) {
          return this.errorMessages['genderRequired'];
        }
      }
      return null;
    }
    getStatusError(): string | null {
      const control = this.registrationForm.get('status');
      if ((control && control.dirty) || control?.touched) {
        if (control?.hasError('required')) {
          return this.errorMessages['statusRequired'];
        }
      }
      return null;
    }
    getSubjectsError(): string | null {
      const control = this.registrationForm.get('subjects');
      if (control && control.invalid) {
        return this.errorMessages['subjectsRequired'];
      }
      return null;
    }
    getDebitSiteError(): string | null {
      if (this.registrationForm.hasError('debitsiteRequired')) {
        return this.errorMessages['debitsiteRequired'];
      }
      const control = this.registrationForm.get('debitsite');
      if (control && control?.hasError('duplicateDebitSites')) {
        return this.errorMessages['duplicateDebitSites'];
      }
      return null;
    }
    getSubscribeError(): string | null {
      const control = this.registrationForm.get('subscribe');
      if ((control && control.dirty) || control?.touched) {
        if (control?.hasError('required')) {
          return this.errorMessages['subscribeRequired'];
        }
      }
      return null;
    }

    ngOnInit(): void {
      this.loadRecords();
      this.registrationForm = this.fb.group(
        {
          id: '',
          name: [
            '',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(50),
              lettersAndSpacesValidator(),
            ],
          ],
          email: ['', [Validators.required, emailValidator()]],
          subscribe: [false],
          password: ['', [Validators.required, Validators.minLength(4)]],
          confirmPassword: ['', Validators.required],
          gender: ['M', Validators.required],
          subjects: this.fb.group({
            maths: [false],
            physics: [false],
            chemistry: [false],
          }),
          status: [''],
          debitsite: this.fb.array(
            [this.createDebitSitePair()],
            noDuplicateDebitSitesValidator()
          ),
        },
        {
          validators: [passwordValidator, this.statusBasedDebitSiteValidator],
        } as AbstractControlOptions
      );

      const email = this.registrationForm.get('email');
      email?.setValidators([Validators.required, emailValidator()]);
      email?.updateValueAndValidity();
    }

    // registrationForm = new FormGroup({
    //   id: new FormControl(''),
    //   name: new FormControl(''),
    //   email: new FormControl(''),
    //   password: new FormControl(''),
    //   confirmPassword: new FormControl(''),
    //   gender: new FormControl('M'),
    //   subjects : new FormGroup({
    //     maths:new FormControl(false),
    //     physics: new FormControl(false),
    //     chemistry: new FormControl(false)
    //   })

    // });

    statusBasedDebitSiteValidator(group: FormGroup): { [key: string]: any } | null {
      const status = group.get('status')?.value;
      const debitsite = group.get('debitsite') as FormArray;

      const isAtLeastOneDebitSiteValid = debitsite.controls.some(
        (control) => control.get('key')?.value && control.get('value')?.value
      );

      if (status === 'Active in Process/Order' && !isAtLeastOneDebitSiteValid) {
        return { debitsiteRequired: true };
      }

      return null;
    }

    createDebitSitePair(): FormGroup {
      return this.fb.group({
        key: [''],
        value: [''],
      });
    }

    get debitsite(): FormArray {
      return this.registrationForm.get('debitsite') as FormArray;
    }

    addDebitSitePair(): void {
      this.debitsite.push(this.createDebitSitePair());
      this.registrationForm.get('debitsite')?.updateValueAndValidity();
    }

    removeDebitSitePair(index: number): void {
      this.debitsite.removeAt(index);
      this.registrationForm.get('debitsite')?.updateValueAndValidity();
    }

    hasEmptySelections(): boolean {
      const debitSiteArray = this.registrationForm.get(
        'debitsite'
      ) as FormArray;
      return debitSiteArray.controls.some((control) => {
        const key = control.get('key')?.value;
        const value = control.get('value')?.value;
        return !key || !value;
      });
    }

    onIdInput(event: Event) {
      const input = event.target as HTMLInputElement;
      // console.log(input);

      let value = input.value;
      // console.log("value",value);
      value = value.replace(/[^0-9]/g, '');
      // console.log("value  replace",value);

      if (value.length > 0 && Number(value) === 0) {
        value = '';
      }

      // while(value[0]!=='0' && value.length>0){
      //      value=value.slice(1);
      // }

      input.value = value;
    }

    send(value: any) {
      const status = this.registrationForm.get('status')?.value;
      const debitsite = this.registrationForm.get('debitsite') as FormArray;

      if (status === 'Active in Process/Order' && debitsite.length === 0) {
        alert('At Least One Debit Site Must Be Selected.');
        return;
      }

      this.service.createForm(this.registrationForm.value).subscribe(
        (response) => {
          alert('Form submitted successfully');
          console.log('Data sent successfully', response);
          this.loadRecords();
        },
        (error) => {
          console.error('Error sending data', error);
        }
      );

      this.formVisible = false;
      this.show = false;
    }

    modifyRecord(val: any) {
      if (confirm('Do you want to modify?')) {
        if (val.id) {
          this.service.updateForm(val.id, val).subscribe(
            (response) => {
              console.log('Record updated successfully', response);
            },
            (error) => {
              console.error('Error updating record', error);
            }
          );
        } else {
          console.error('Record ID is missing');
        }
      }
      this.formVisible = false;
      this.show = false;
    }

    populate(id: any) {
      this.searchId = id;

      if (id == null || id <= 0) {
        alert('You need to enter a valid ID');
        return;
      }
      this.show = true;

      this.service.getById(id).subscribe(
        (response) => {
          this.registrationForm.patchValue({
            ...response,
            id: response.id[0],
          });
          this.debitsite.clear();
          console.log('after clearign debit site ,', this.debitsite);
          if (response.debitsite && response.debitsite.length) {
            response.debitsite.forEach((item: any) => {
              this.debitsite.push(
                this.fb.group({
                  key: item.key,
                  value: item.value,
                })
              );
            });
          } else {
            this.debitsite.push(this.createDebitSitePair());
          }

          this.initialFormState = { ...response };
          this.isNewRecord = false;
          this.formVisible = true;
        },
        (error) => {
          console.error('Error fetching data by ID:', error);
          if (error.status === 404) {
            this.resetFormToEmpty(id);
          } else {
            alert('An error occurred while fetching the record');
          }
        }
      );
    }

    deleteForm() {
      this.loadRecords();
      if (confirm('Do you want to Delete?')) {
        this.service.deleteForm(this.registrationForm.value.id).subscribe();
      }
      this.formVisible = false;
      this.show = false;
    }

    loadRecords() {
      this.service.getAllForms().subscribe(
        (data) => {
          this.formRecords = data;
          console.log(this.formRecords);
        },
        (error) => console.log('Error loading records:', error)
      );
    }

    selectRecord(record: any) {
      this.show = true;
      this.formVisible = true;
      console.log('in selectRecord');
      this.registrationForm.patchValue(record);
      this.initialFormState = { ...record };
      document.getElementById('btn-close')?.click();
      this.isNewRecord = false;

      this.debitsite.clear();
      if (record.debitsite && record.debitsite.length) {
        record.debitsite.forEach((item: any) => {
          this.debitsite.push(
            this.fb.group({
              key: [item.key || ''],
              value: [item.value || ''],
            })
          );
        });
      }
    }

    cancel() {
      this.formVisible = false;
      this.show = false;
    }

    resetFormToEmpty(idNumber: string) {
      console.log('in reset mehtod', idNumber);
      //console.log(this.defaultValues.subjects);
      this.formVisible = true;
      this.isNewRecord = true;

      this.registrationForm.patchValue({
        id: idNumber,
        name: '',
        email: '',
        subscribe: false,
        password: '',
        confirmPassword: '',
        gender: 'M',
        subjects: {
          maths: false || this.defaultValues.subjects.maths,
          physics: false || this.defaultValues.subjects.physics,
          chemistry: false || this.defaultValues.subjects.chemistry,
        },
        alternativeEmails: this.fb.array([]),
      });
      const debitsiteArray = this.registrationForm.get(
        'debitsite'
      ) as FormArray;
      debitsiteArray.clear();
      debitsiteArray.push(this.createDebitSitePair());
    }

    resetForm() {
      if (this.initialFormState) {
        this.registrationForm.patchValue(this.initialFormState);
      } else {
        this.resetFormToEmpty(this.searchId);

        //   this.registrationForm.get('email')?.clearValidators();
        //   this.registrationForm.get('debitsite')?.clearValidators();
        //   this.registrationForm.get('password')?.clearValidators
      }
    }

    applyDefaultValues() {
      //console.log("In applyDefaultValues method:", this.defaultValues.subjects);
      const subjectsGroup = this.registrationForm.get('subjects') as FormGroup;

      if (this.defaultValues.subjects) {
        subjectsGroup.patchValue(this.defaultValues.subjects);
      } else {
        console.warn('Default values for subjects are not set.');
      }
    }

    setDefaultValues(record: any) {
      this.defaultValues.subjects = {
        maths: record.subjects?.maths || false,
        physics: record.subjects?.physics || false,
        chemistry: record.subjects?.chemistry || false,
      };
      alert('default values are set successfully');
      //console.log(this.defaultValues.subjects);
    }

    setToDefaultSelection() {
      const debitsiteArray = this.registrationForm.get(
        'debitsite'
      ) as FormArray;
      const Group = debitsiteArray.at(0) as FormGroup;
      Group.get('key')?.setValue('');
      Group.get('value')?.setValue('');
    }
  }















