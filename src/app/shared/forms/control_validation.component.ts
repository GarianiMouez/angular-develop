import { FormGroup } from '@angular/forms';

export function controlsEqual(controlName: string, equalToName: string, errorKey: string = controlName) {
    return (form: FormGroup) => {
        const control = form.get(controlName);

        if (control.value !== form.get(equalToName).value) {
            control.setErrors({ [errorKey]: true });
            return {
                [errorKey]: true,
            };
        } else {
            control.setErrors(null);
            return null;
        }
    };
}
