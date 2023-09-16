export type Form = {
  id?: number;
  title: string;
  description?: string;
  is_public: boolean;
};

export type Errors<T> = Partial<Record<keyof T, string>>;

export const validateForm = (form: Form) => {
  const errors: Errors<Form> = {};
  if (form.title.length < 1) {
    errors.title = "Title cannot be empty";
  }
  if (form.title.length > 100) {
    errors.title = "Title cannot be longer than 100 characters";
  }
  return errors;
};
