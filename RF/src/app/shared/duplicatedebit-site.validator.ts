import { AbstractControl, ValidatorFn } from '@angular/forms';

export function noDuplicateDebitSitesValidator(): ValidatorFn {
  return (formArray: AbstractControl): { [key: string]: any } | null => {
    const debitSites = formArray.value;

    
    const uniquePairs = new Set();
    for (const site of debitSites) {
      const pair = `${site.key}-${site.value}`;
      if (uniquePairs.has(pair)) {
        
        return { duplicateDebitSites: true };
      }
      uniquePairs.add(pair);
      
    }
    return null;
  };
}