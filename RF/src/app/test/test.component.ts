import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  amount: string = '0.00';

 

  onBlur(): void {
    if (!this.amount || this.amount === '0.' || this.amount === '0.0') {
      this.amount = '0.00';
    } else {
      const [integerPart, decimalPart] = this.amount.split('.');
      this.amount = this.formatValue(integerPart, decimalPart || '00');
    }
  }

  onInput(event: Event): void {
    this.onBlur();
    const inputElement = event.target as HTMLInputElement;
    let input = inputElement.value;
    const cursorPosition = inputElement.selectionStart ?? 0;

    const decimalIndex = input.indexOf('.');
    let integerPart = decimalIndex === -1 ? input : input.substring(0, decimalIndex);
    let decimalPart = decimalIndex === -1 ? '' : input.substring(decimalIndex + 1);

    
    integerPart = integerPart.replace(/[^0-9]/g, '');
    decimalPart = decimalPart.replace(/[^0-9]/g, '');

    if (integerPart.length > 8) {
      integerPart = integerPart.slice(0, 8);
    }

    if (decimalPart.length > 2) {
      decimalPart = decimalPart.slice(0, 2);
    }

    // Update input value only if valid
    const newValue = decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
    this.amount = newValue;

   
    inputElement.value = this.amount;

    // Restore cursor position
    setTimeout(() => {
      const newCursorPosition = Math.min(cursorPosition, this.amount.length);
      inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  }

  private formatValue(integerPart: string, decimalPart: string): string {
    
    const formattedInteger = integerPart || '0';
    const formattedDecimal = decimalPart.padEnd(2, '0');
    return `${formattedInteger}.${formattedDecimal}`;
  }




  
}