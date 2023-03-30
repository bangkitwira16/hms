import { Options } from "../select/select.component";

export interface DynamicForm {
  type: string;
  label: string;
  name: string;
  value?: string | number| null;
  options?: Options[];
  required?: boolean;
  disabled?: boolean;
}
