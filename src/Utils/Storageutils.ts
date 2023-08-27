import { formField } from "../types";

export const initialFormFields: formField[] = [
  { id: 1, label: "First Name", type: "text", value: "" },
  {
    id: 2,
    label: "Last Name",
    type: "text",
    value: "",
  },
  {
    id: 3,
    label: "Email",
    type: "email",
    value: "",
  },
  {
    id: 4,
    label: "Date of Birth",
    type: "date",
    value: "",
  },
  {
    id: 5,
    label: "Phone Number",
    type: "tel",
    value: "",
  },
];
