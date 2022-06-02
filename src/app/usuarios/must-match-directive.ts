import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup } from '@angular/forms';
import { Directive, Input } from "@angular/core";
import { MustMatch } from "./must-match";

@Directive({
    selector: '[mustMatch]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MustMatchDirective, multi: true }]
})

export class MustMatchDirective implements Validator{

    @Input('mustMatch') mustMatch: string[] = [];

    validate(formGroup: FormGroup): ValidationErrors {
        
        return MustMatch(this.mustMatch[0], this.mustMatch[1])(formGroup);
        

    }
    registerOnValidatorChange?(fn: () => void): void {
        throw new Error("Method not implemented.");
    }
}
