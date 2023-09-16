import React, { useEffect, useState } from "react";
import {
  fetchFormData,
  fetchFormFields,
  fetchSubmission,
} from "../Utils/apiUtils";
import Error from "./Error";
import { formField } from "../types/types";

const getInitialState = async (id: number) => {
  try {
    const [formFields, data] = await Promise.all([
      fetchFormFields(id),
      fetchFormData(id),
    ]);

    if (!data || !formFields || formFields.results.length === 0) {
      return {
        id: 1,
        title: "No title",
        formFields: [],
      };
    }

    return {
      id: data.id,
      title: data.title,
      formFields: formFields.results,
    };
  } catch (error) {
    console.error(error);
    throw error; // You may want to handle this error more gracefully
  }
};

export default function Submission(props: {
  formId: number;
  submissionId: number;
}) {
  const [formState, setFormState] = useState<{
    id: number;
    title: string;
    formFields: formField[];
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialState = await getInitialState(props.formId);
        setFormState(initialState);
      } catch (error) {
        setNotFound(true);
      }
    };

    fetchData();
  }, [props.formId]);

  useEffect(() => {
    const fetchFormDetailsAndFields = async () => {
      try {
        const form = await fetchFormData(props.formId);
        const formFields = await fetchFormFields(props.formId).then(
          (data) => data.results,
        );
        setFormState((state) => ({
          ...state!,
          id: form.id,
          title: form.title,
          formFields,
        }));
      } catch (err) {
        setNotFound(true);
        console.error(err);
      }
    };
    fetchFormDetailsAndFields();
  }, [props.formId]);

  const [submission, setSubmission] = useState<any>({});
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const submissionData = await fetchSubmission(
          props.formId,
          props.submissionId,
        );
        setSubmission(submissionData);
        setIsLoading(false);
      } catch (error) {
        setNotFound(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [props.formId, props.submissionId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (notFound) {
    return <Error />;
  }

  if (!formState || !submission) {
    return <div>Unable to fetch data.</div>;
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md overflow-y-auto">
      <h1 className="text-xl font-semibold mb-3">{formState.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {submission?.answers?.map((answer: any, index: number) => (
          <div
            key={index}
            className="bg-white p-3 rounded-lg shadow-sm transition duration-300 hover:bg-purple-100"
          >
            <p className="text-lg font-semibold mb-2">
              {formState.formFields[index]?.label}
            </p>
            <p className="text-lg">{answer.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
