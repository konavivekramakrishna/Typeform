import React, { useEffect, useState } from "react";
import { fetchAllSubmissions } from "../Utils/apiUtils";
import { Link } from "raviger";

export default function AllSubmissions(props: { formId: number }) {
  const [allSubmissions, setAllSubmissions] = useState([]);

  useEffect(() => {
    fetchAllSubmissions(props.formId).then((data) => {
      setAllSubmissions(data.results);
    });
  }, [props.formId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        All Submissions
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allSubmissions.map((submission: { id: number }, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Submission - {idx + 1}
              </h2>
              <Link
                href={`/submissions/${props.formId}/answer/${submission.id}`}
                className="text-purple-500 hover:text-purple-600 focus:outline-none"
              >
                <i className="fi fi-rr-eye text-xl"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
