// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-date',
//   templateUrl: './date.component.html',
//   styleUrls: ['./date.component.css'],
// })
// export class DateComponent {
//   date: string = '';

//   dateInput(event: Event): void {
//     const inputElement = event.target as HTMLInputElement;
//     const rawInput = inputElement.value;

//     // Remove non-numeric characters, except slashes
//     let input = rawInput.replace(/[^0-9/]/g, '');

//     // Handle backspace and clearing
//     if (!input) {
//       this.date = ''; // If the input is empty, clear everything
//       return;
//     }

//     let parts = input.split('/');
//     let month = parts[0] || '';
//     let day = parts[1] || '';
//     let year = parts[2] || '';

//     // Validate month
//     if (month.length > 2) {
//       day = month.substring(2) + day;
//       month = month.substring(0, 2);
//     }
//     if (month.length === 1 && parseInt(month, 10) > 1) {
//       month = '0' + month; // Prepend 0 if necessary
//     }
//     if (month.length === 2 && parseInt(month, 10) > 12) {
//       month = month[0]; // Trim invalid input
//     }

//     // Validate day
//     if (day.length > 2) {
//       year = day.substring(2) + year;
//       day = day.substring(0, 2);
//     }
//     const firstDayDigit = day.charAt(0);
//     const secondDayDigit = day.charAt(1);

//     if (firstDayDigit === '3') {
//       // If first digit is 3, second digit can only be 0 or 1
//       if (secondDayDigit && !['0', '1'].includes(secondDayDigit)) {
//         day = firstDayDigit;
//       }
//     } else if (firstDayDigit && !['0', '1', '2'].includes(firstDayDigit)) {
//       // If invalid first digit, clear day
//       day = '';
//     }

//     // Validate year
//     if (year.length > 4) {
//       year = year.substring(0, 4);
//     }

//     // Reconstruct the date string
//     this.date = [month, day, year].filter(Boolean).join('/');

//     // Update the input field value
//     inputElement.value = this.date;

//     // Reset cursor position
//     setTimeout(() => {
//       inputElement.setSelectionRange(this.date.length, this.date.length);
//     }, 0);
//   }
// }


import { Component } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
})
export class DateComponent {
  date: string = '';

  dateInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let input = inputElement.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters

    let month = input.substring(0, 2);
    let day = input.substring(2, 4);
    let year = input.substring(4);

    // Handle month input
    if (month) {
      const firstMonthDigit = month.charAt(0);
      const secondMonthDigit = month.charAt(1);

      if (firstMonthDigit === '1') {
        // If first digit is 1, second digit can only be 0, 1, or 2
        if (secondMonthDigit && !['0', '1', '2'].includes(secondMonthDigit)) {
          month = firstMonthDigit; // Invalid second digit, keep only the first
        }
      } else if (firstMonthDigit === '0') {
        // If first digit is 0, allow second digit from 0 to 9
        if (secondMonthDigit && parseInt(secondMonthDigit, 10) > 9) {
          month = firstMonthDigit; // Invalid second digit, keep only the first
        }
      } else {
        // Invalid first digit for month
        month = '';
      }

      if (month.length === 2) {
        input = month + '/';
      } else {
        input = month;
      }
    }

    // Handle day input
    if (day) {
      const firstDayDigit = day.charAt(0);
      const secondDayDigit = day.charAt(1);

      if (firstDayDigit === '0' || firstDayDigit === '1' || firstDayDigit === '2') {
        // Allow any second digit for first digits 0, 1, or 2
        if (secondDayDigit && parseInt(secondDayDigit, 10) > 9) {
          day = firstDayDigit; // Invalid second digit, keep only the first
        }
      } else if (firstDayDigit === '3') {
        // If first digit is 3, second digit can only be 0 or 1
        if (secondDayDigit && !['0', '1'].includes(secondDayDigit)) {
          day = firstDayDigit; // Invalid second digit, keep only the first
        }
      } else {
        // Invalid first digit for day
        day = '';
      }

      if (day.length === 2) {
        input = month + '/' + day + '/';
      } else {
        input = month + '/' + day;
      }
    }

    // Handle year input
    if (year) {
      input = month + '/' + day + '/' + year.substring(0, 4); // Allow up to 4 digits for year
    }

    // Update the formatted date
    this.date = input;

    // Update the input field value
    inputElement.value = this.date;

    // Reset cursor position to the end
    setTimeout(() => {
      inputElement.setSelectionRange(this.date.length, this.date.length);
    }, 0);
  }
}
