import React, { useEffect, useState, useRef } from "react";
import { useQueryParams, Link, navigate } from "raviger";
import Modal from "./common/Modal";
import CreateForm from "./CreateForm";
import { listFormsWithPagination, deleteForm } from "../Utils/apiUtils";
import { formData } from "../types/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetchForms = (
  setForsCB: (value: formData[]) => void,
  setCountCB: (value: number) => void,
  offset: number,
  limit: number,
) => {
  listFormsWithPagination({ offset, limit })
    .then((res) => {
      setForsCB(res.results);
      setCountCB(res.count);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default function Home() {
  const [{ search }, setQuery] = useQueryParams();

  const [forms, setForms] = useState<formData[]>([]);
  const [searchString, setSearchString] = useState("");
  const [newForm, setNewForm] = useState(false);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const limit = 5;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey) {
      switch (event.key.toLowerCase()) {
        case "c":
          setNewForm(true);
          break;

        default:
          break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleDelete = (id: number) => {
    deleteForm(id)
      .then(() => {
        setForms(forms.filter((form) => form.id !== id));
        fetchForms(setForms, setCount, offset, limit);
        toast.success("Form deleted successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      })
      .catch((error) => {
        console.error("Error deleting form:", error);
        toast.error("Error deleting form", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      });
  };

  useEffect(() => {
    fetchForms(setForms, setCount, offset, limit);
  }, [offset]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery({ search: searchString });
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [forms, search]);

  return (
    <div className="p-5">
      <ToastContainer />
      <div className="m-2 ">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 ">
            <label className="m-1">Search</label>
            <input
              className="flex-1 border w-full border-gray-300 rounded-lg py-2 px-3 leading-tight focus:shadow-outline-blue focus:border-blue-500"
              type="text"
              name="search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div
        className="bg-gray-100 p-4 rounded-lg shadow-md overflow-y-auto focus:shadow-outline-blue focus:border-blue-500"
        style={{ maxHeight: "40vh" }}
        ref={scrollContainerRef}
        tabIndex={0}
      >
        <h1 className="text-xl font-semibold mb-3">Saved Forms</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-center transition duration-300 hover:bg-purple-100">
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded focus:shadow-outline-blue focus:border-blue-500 focus:shadow-outline-purple active:bg-purple-800"
              onClick={() => setNewForm(true)}
            >
              <i className="fi fi-rr-add text-lg"></i>
              <span className="ml-2">Add New Form</span>
            </button>
          </div>
          {forms
            .filter((form) => {
              return form.title
                .toLowerCase()
                .includes((search || "").toLowerCase());
            })
            .map((form) => (
              <div
                key={form.id}
                className="bg-white p-3 rounded-lg shadow-sm focus:shadow-outline-blue focus:border-blue-500  transition duration-300 hover:bg-blue-100"
              >
                <h2 className="text-lg font-semibold mb-1 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {form.title}
                </h2>
                <span className="text-gray-600">{form.description}</span>

                <div className="flex justify-end ">
                  <Link
                    className="text-purple-500 hover:text-purple-600 focus:shadow-outline-blue focus:border-blue-500 py-2 px-4"
                    href={`/preview/${form.id}`}
                  >
                    <i className="fi fi-rr-eye text-xl"></i>
                  </Link>
                  <Link
                    className="text-green-500 hover:text-green-600 focus:shadow-outline-blue focus:border-blue-500 py-2 px-4"
                    href={`/submissions/${form.id}`}
                  >
                    <i className="fi fi-sr-chart-user"></i>
                  </Link>

                  <Link
                    className="text-blue-500 hover:text-blue-600 focus:shadow-outline-blue focus:border-blue-500 py-2 px-4"
                    href={`/forms/${form.id}`}
                  >
                    <i className="fi fi-rr-edit text-xl"></i>
                  </Link>
                  <button
                    className="text-red-500 hover:text-red-600 focus:shadow-outline-blue focus:border-blue-500 py-2 px-4"
                    onClick={() => handleDelete(form.id)}
                  >
                    <i className="fi fi-rr-trash text-xl"></i>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="mt-8 m-5 flex justify-between items-center">
        <div className="flex items-center">
          <button
            className="text-gray-600 hover:text-gray-900 focus:shadow-outline-blue focus:border-blue-500"
            onClick={() => {
              setOffset((offset) => {
                return offset - limit >= 0 ? offset - limit : offset;
              });
            }}
          >
            <i className="fi fi-rr-angle-double-left text-2xl"></i>
          </button>
          <span className="mx-2 text-gray-600">
            {offset + 1} - {offset + limit > count ? count : offset + limit} of{" "}
            {count}
          </span>
          <button
            className="text-gray-600 hover:text-gray-900 focus:shadow-outline-blue focus:border-blue-500"
            onClick={() => {
              setOffset((offset) => {
                return offset + limit < count ? offset + limit : offset;
              });
            }}
          >
            <i className="fi fi-rr-angle-double-right text-2xl"></i>
          </button>
        </div>
        <div>
          <span className="text-gray-600">Items per page: {limit}</span>
        </div>
      </div>
      <Modal open={newForm} closeCB={() => setNewForm(false)}>
        <CreateForm />
      </Modal>
    </div>
  );
}
