import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { SNACK_SUCCESS_CLASS, SNACK_ERROR_CLASS, SNACK_INFO_CLASS } from '../utils/constants.enum';


@Injectable()
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  info(message: string, action?: string, config?: MatSnackBarConfig): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      ...config,
      panelClass: SNACK_INFO_CLASS
    });
  }

  success(message: string, action?: string, config?: MatSnackBarConfig): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      ...config,
      panelClass: SNACK_SUCCESS_CLASS
    });
  }

  error(message: string, action?: string, config?: MatSnackBarConfig): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      ...config,
      panelClass: SNACK_ERROR_CLASS
    });
  }
}
