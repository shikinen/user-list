import validator from 'validator';

class FormValidator {
    constructor(validations) {
        // tablica reguł walidacji
        this.validations = validations;
    }

    validate(state) {
        let validation = this.valid();

        // pętla do reguł
        this.validations.forEach(rule => {

            // sprawdzenie, czy poprzednia reguła nie zablokowała walidacji
            if (!validation[rule.field].isInvalid) {
                // rozpoznanie pola i puszczenie argumentów
                const field_value = state[rule.field].toString();
                const args = rule.args || [];
                const validation_method =
                    typeof rule.method === 'string' ?
                        validator[rule.method] :
                        rule.method

                if (validation_method(field_value, ...args, state) !== rule.validWhen) {
                    validation[rule.field] = { isInvalid: true, message: rule.message }
                    validation.isValid = false;
                }
            }
        });

        return validation;
    }

    valid() {
        const validation = {}

        this.validations.map(rule => (
            validation[rule.field] = { isInvalid: false, message: '' }
        ));

        return { isValid: true, ...validation };
    }
}

export default FormValidator;