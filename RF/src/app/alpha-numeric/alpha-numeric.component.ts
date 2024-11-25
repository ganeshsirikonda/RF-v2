import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-alpha-numeric',
  templateUrl: './alpha-numeric.component.html',
  styleUrl: './alpha-numeric.component.css'
})
export class AlphaNumericComponent {

  @ViewChild('Alphanum') Alpha: ElementRef | undefined;

  alphaInput(event: Event): void {
    const input = this.Alpha?.nativeElement as HTMLInputElement;
    const lastChar = input.value.slice(-1);
    const char = lastChar.charCodeAt(0); // getting ASCII

    // Allow only numbers and alphabets (A-Z, a-z, 0-9)
    if (
      !(
        (char >= 48 && char <= 57) ||
        (char >= 65 && char <= 90) ||
        (char >= 97 && char <= 122)
      )
    ) {
      input.value = input.value.slice(0, -1);
    }
  }

}
