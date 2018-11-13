import {
    inputIsRequired,
    inputNonWhitespace,
    emailNotInValidForm
} from './../assets/strings/strings';
import { IValidation } from './appDataStructures';

export function emptyAndNonWhitespaceInput(newInput: string) {
    let isEmpty = false;
    let isWhitespace = false;
    let isValidated = true;

    if (newInput.length === 0) {
        isEmpty = true;
        isValidated = false;
    } else if (!newInput.trim()) {
        isWhitespace = true;
        isValidated = false;
    }

    return {
        isWhitespace: isWhitespace,
        isEmpty: isEmpty,
        isValidated: isValidated
    };
}

export function inputValidationEmailSettings(newInput: string): IValidation {
    let message = '';
    const check = emptyAndNonWhitespaceInput(newInput);

    if (check.isEmpty) {
        message = inputIsRequired;
    } else if (check.isWhitespace) {
        message = inputNonWhitespace;
    }

    return {
        message: message,
        isValidated: check.isValidated
    };
}

export function emailFormValidation(email: string): IValidation {
    let message = '';
    const regex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    const check = emptyAndNonWhitespaceInput(email);
    const isValidated = check.isValidated && regex.test(email);

    if (check.isEmpty) {
        message = inputIsRequired;
    } else if (check.isWhitespace) {
        message = inputNonWhitespace;
    } else if (!regex.test(email)) {
        message = emailNotInValidForm;
    }

    return {
        message: message,
        isValidated: isValidated
    };
}
