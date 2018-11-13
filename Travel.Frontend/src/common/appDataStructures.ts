export interface IValidation {
    message: string;
    isValidated: boolean;
}

export interface IAction {
    type: string;
    payload?: any;
}

export const defaultAction = {
    type: '',
    payload: null
};

export interface IActivationResult {
    isActivated: boolean;
    message: string;
}
