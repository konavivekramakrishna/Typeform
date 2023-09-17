import { PaginationParams } from "../types/common";
import { Form } from "../types/createFormTypes";
import { fieldOption } from "../types/formReducerTypes";
import { formAnswers, formField } from "../types/types";

const BASE_API_URL = "https://tsapi.coronasafe.live/api/";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export const request = async (
  endpoint: string,
  method: Method,
  data: any = {},
) => {
  let url;
  let payload: string;
  if (method === "GET") {
    const requestParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join("&")}`
      : "";

    url = `${BASE_API_URL}${endpoint}${requestParams}`;
    payload = "";
  } else {
    url = `${BASE_API_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }
  const token = localStorage.getItem("token");
  const auth = token ? "Token " + token : "";

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: method !== "GET" ? payload : null,
  });

  try {
    if (res.ok) {
      return await res.json();
    } else {
      const error = await res.json();
      throw Error(error);
    }
  } catch (error) {
    console.log(error);
  }
};

// form CRUD

export const createForm = async (form: Form) => {
  return await request("forms/", "POST", form);
};

export const listFormsWithPagination = async (pageParams: PaginationParams) => {
  return await request("forms/", "GET", pageParams);
};

export const listForms = async () => {
  return await request("forms/", "GET");
};

export const updateTitle = (formId: number, title: string) => {
  return request(`forms/${formId}/`, "PATCH", { title });
};

export const updateForm = async (id: number, data: Form) => {
  return await request(`forms/${id}/`, "PUT", data);
};

export const deleteForm = async (id: number) => {
  return await request(`forms/${id}/`, "DELETE");
};

export const fetchFormData = async (id: number) => {
  return await request(`forms/${id}/`, "GET");
};

//user CRUD

export const me = async () => {
  return await request("users/me/", "GET", {});
};

// formFields CRUD

export const fetchFormFields = async (id: number) => {
  return await request(`forms/${id}/fields/`, "GET");
};

export const listFormField = async (id: number, fieldId: number) => {
  return await request(`forms/${id}/fields/${fieldId}/`, "GET");
};

export const addFieldToForm = async (
  id: number,
  data: {
    label: string;
    kind: formField["kind"];
    options?: [];
    meta?: {
      description: {
        fieldType: "text";
      };
    };
  },
) => {
  return await request(`forms/${id}/fields/`, "POST", data);
};

export const updateField = async (
  id: number,
  fieldId: number,
  data: {
    label?: string;
    options?: fieldOption[];
    meta?: {
      description: {
        fieldType: "text";
      };
    };
  },
) => {
  return await request(`forms/${id}/fields/${fieldId}/`, "PATCH", data);
};

export const updateFormField = (form_id: number, data: formField) => {
  return request(`forms/${form_id}/fields/${data.id}/`, "PUT", data);
};

export const deleteField = async (id: number, fieldId: number) => {
  return await request(`forms/${id}/fields/${fieldId}/`, "DELETE");
};

//authentication
export const login = async (username: string, password: string) => {
  return await request("auth-token/", "POST", { username, password });
};

// submission CRUD
export const formSubmit = async (
  id: number,
  answers: formAnswers[],
  form: {
    title: string;
    description?: string;
    is_public?: boolean;
  },
) => {
  return request(`forms/${id}/submission/`, "POST", {
    answers,
    form,
  });
};

// submission CRUD

export const fetchAllSubmissions = async (id: number) => {
  return await request(`forms/${id}/submission/`, "GET");
};

export const fetchSubmission = async (id: number, submissionId: number) => {
  return await request(`forms/${id}/submission/${submissionId}/`, "GET");
};
