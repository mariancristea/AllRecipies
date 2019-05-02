import { Component, Inject, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { MatDialogRef, MAT_DIALOG_DATA, ErrorStateMatcher } from '@angular/material';
import { UserService, User } from '../core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormGroupDirective, FormControl, NgForm, Validators } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
        const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
        console.log('error');
        return (invalidCtrl || invalidParent);
      }
}

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
    editActivated: boolean = false;
    changeActivated: boolean = false;
    passwordForm: FormGroup;
    editUserForm: FormGroup;
    matcher = new MyErrorStateMatcher();
    user: User = {} as User;
    hide: boolean = true;

    constructor(
        private userService: UserService,
        private router: Router,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ProfileComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        this.passwordForm = this.formBuilder.group({
            password: ['', [Validators.required]],
            confirmPassword: ['']
        }, { validator: this.checkPasswords });

        this.editUserForm = this.formBuilder.group({
            username: [''],
            bio: [''],
            image: ['']
        })
    }

    ngOnInit() {
        console.log('initt');
        Object.assign(this.user, this.userService.getCurrentUser());
        // Fill the form
        this.editUserForm.patchValue(this.user);
    }

    checkPasswords(group: FormGroup) {
        const pass = group.controls.password.value;
        const confirmPass = group.controls.confirmPassword.value;

        return pass === confirmPass ? null : { notSame: true }
    }

    switchToChangePassword() {
        this.changeActivated = true;
    }
    switchToUserEdit() {
        this.editActivated = true;
    }
    submitPasswordForm() {
        console.log({'password': this.passwordForm.value.password});
        this.updateUser({'password': this.passwordForm.value.password});
        console.log(this.user);

        this.userService
            .update(this.user)
            .subscribe(
                updatedUser => {
                    this.router.navigateByUrl('/profile/' + updatedUser.username);
                    this.dialogRef.close();
                }
            );
    }

    submitEditForm() {
        this.updateUser(this.editUserForm.value);
        console.log(this.user);
        this.userService
        .update(this.user)
        .subscribe(
          updatedUser => this.router.navigateByUrl('/profile/' + updatedUser.username)
        );
    }

    updateUser(values: Object){
        Object.assign(this.user, values);
    }
    logOut() {
        this.userService.logOut().subscribe(
            () => this.router.navigateByUrl('/')
          );

        this.dialogRef.close();
    }

    cancel() {
        this.editActivated = this.changeActivated = false;
        this.passwordForm.reset();
    }
}
