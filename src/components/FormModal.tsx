"use client";

import { Plus, Edit, Trash2, X, TriangleAlert } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";
const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}) => {
  const [open, setOpen] = useState(false);

  // ESC key close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const Form = () => {
    return type === "delete" && id ? (
      <form action="">
        <div className="flex flex-col justify-center items-center h-[90vh] gap-4">
          <TriangleAlert className="icon size-40 text-[#FFC107]" />
          <span className="text-xl text-center">
            All data will be lost. Are you sure you want to delete this {table}?
          </span>
          <button
            className="text-white bg-red-500 w-full p-3 rounded-md"
            onClick={() => setOpen(false)}
          >
            Delete
          </button>
        </div>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={
          type === "create"
            ? "button-rounded"
            : type === "delete"
            ? "button-rounded-delete"
            : "button-rounded-purple"
        }
        onClick={() => setOpen(true)}
      >
        {type === "create" && <Plus className=" " />}
        {type === "update" && <Edit className="icon" />}
        {type === "delete" && <Trash2 className="icon text-black" />}
      </button>

      <div
        className={`fixed inset-0 z-40 transition-opacity duration-700 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 "
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 h-full w-[90%] md:w-[500px] bg-gray-50 shadow-2xl p-6
            transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="h-full overflow-y-auto p-2">
            <button
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <X className="icon size-8" />
            </button>

            <Form />
          </div>
        </div>
      </div>
    </>
  );
};

export default FormModal;
