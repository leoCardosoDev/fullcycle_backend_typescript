import { FieldsErrors } from "./shared/domain/validators/validator_fields_interface";

declare global {
  namespace jest {
    interface Matchers<R> {
        containsErrorMessages: (expected: FieldsErrors) => R;
    }
  }
}
