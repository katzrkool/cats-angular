import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CatsApiService } from 'src/app/services/cats-api/cats-api.service';
import { ICat } from 'src/app/services/cats-api/cats-response.interface';

@Component({
  selector: 'app-cat-form',
  templateUrl: './cat-form.component.html',
  styleUrls: ['./cat-form.component.scss'],
})
export class CatFormComponent implements OnInit, OnDestroy {
  public cat: ICat;
  public form: FormGroup;
  public clearButtonEnabled: boolean = false;
  public fetching: boolean = false;

  private _subscription: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _catsApiService: CatsApiService,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: ICat
  ) {
    this.form = this._fb.group({
      name: this._fb.control('', [Validators.required]),
      age: this._fb.control('', Validators.required),
      description: this._fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {
    this._subscription = this.form.valueChanges.subscribe(() => {
      this.clearButtonEnabled = this.controlsAreValid();
    });

    this.cat = this.data;
    if (this.cat) {
      this.form.patchValue({
        name: this.cat.info.name,
        age: this.cat.info.age,
        description: this.cat.info.description,
      });
      this.form.markAsPristine();
    }
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  public saveCat(): void {
    this.fetching = true;
    let body = {
      name: this.form.get('name')?.value,
      age: this.form.get('age')?.value.toString(),
      description: this.form.get('description')?.value,
    };
    if (this.cat) {
      this._catsApiService
        .updateCat(this.cat.id, body.name, body.age, body.description)
        .subscribe(() => {
          this._dialogRef.close(true);
        });
    } else {
      this._catsApiService
        .createCat(body.name, body.age, body.description)
        .subscribe(() => {
          this._dialogRef.close(true);
        });
    }
  }

  public close() {
    this._dialogRef.close(false);
  }

  public controlsAreValid() {
    const validControls = Object.values(this.form.controls).filter(
      (control) => control.hasValidator(Validators.required) && control.valid
    );
    if (validControls.length > 0) return true;
    return false;
  }
}
