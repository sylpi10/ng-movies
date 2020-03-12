import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { resolve } from 'dns';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {


  private static readonly API: string = 'http://worldclockapi.com/api/json/utc/now';
  public addMovieForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private router: Router,
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
  ) { }

  // getCurrentYear(): Promise<number> {
  //   return new Promise<number>((resolve) => {
  //     this.httpClient.get<any>(
  //       AddMovieComponent.API
  //     ).pipe(
  //       take(1)
  //     ).subscribe((utcDateTime: any) => {
  //       const now: moment.Moment = moment(utcDateTime.currentDatetime);
  //       const currentYear = parseInt(now.format('YYYY'));
  //       resolve(currentYear)
  //     });
  //     return resolve();

  //   })
  // }


  public get title(): AbstractControl {
    return this.addMovieForm.controls.title;
  }

  public get year(): AbstractControl {
    return this.addMovieForm.controls.year;
  }

  public get originalTitle(): AbstractControl {
    return this.addMovieForm.controls.originalTitle;
  }
  public get duration(): AbstractControl {
    return this.addMovieForm.controls.duration;
  }

  public get director(): AbstractControl {
    return this.addMovieForm.controls.director;
  }
  public get synopsis(): AbstractControl {
    return this.addMovieForm.controls.synopsis;
  }

  public get classification(): AbstractControl {
    return this.addMovieForm.controls.classification;
  }

  public get rating(): AbstractControl {
    return this.addMovieForm.controls.classification;
  }

  ngOnInit(): void {

    const now: moment.Moment = moment();
    const currentYear = parseInt(now.format('YYYY'));

    // const currentYear = 2020;

    this.addMovieForm = this.formBuilder.group({

      title: [
        '',
        Validators.compose(
          [Validators.required, Validators.minLength(2)]
        )
      ],
      year: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.max(currentYear)
        ])
      ],
      originalTitle: [
        '',
        Validators.compose([
          // Validators.required, 
          Validators.minLength(2)
        ])
      ],
      duration: [
        '',
        Validators.compose([
          // Validators.required, 
          // Validators.minLength(2)
        ])
      ],
      director: [
        '',
        Validators.compose([
          // Validators.required, 
          Validators.minLength(2)
        ])
      ],
      synopsis: [
        '',
        Validators.compose([
          // Validators.required, 
          Validators.minLength(10)
        ])
      ],
      classification: [
        '',
        Validators.compose([
          // Validators.required, 
          // Validators.minLength(0)
        ])
      ],
      rating: [
        '',
        Validators.compose([
          // Validators.required, 
          // Validators.minLength(0)
        ])
      ],
    });

  }

  public addMovie(): void {
    this.movieService.createMovie(this.addMovieForm.value).then((status: boolean) => {
      if (status) {
        // Road to home
        const snack: MatSnackBarRef<SimpleSnackBar> = this.snackBar.open(
          'Movie was successfully uploaded !',
          '',
          {
            duration: 2500,
            verticalPosition: 'top'
          }
        );
        snack.afterDismissed().subscribe((status: any) => {
          this.router.navigate(['home']);
        });
      } else {
        this.snackBar.open(
          'Sorry, movie upload failed !',
          '',
          {
            duration: 2500,
            verticalPosition: 'top'
          }
        );
        // Redraw form with empty values
        this.title.setValue('');
        this.year.setValue('');
        this.originalTitle.setValue('');
        this.duration.setValue('');
        this.director.setValue('');
        this.synopsis.setValue('');
        this.classification.setValue('');
        this.rating.setValue('');
      };
    });
  }
}
