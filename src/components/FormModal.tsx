"use client";

import { Plus, Edit, Trash2, X, TriangleAlert } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

import {
  deleteClass,
  deleteExam,
  deleteStudent,
  deleteSubject,
  deleteTeacher,
} from "@/lib/actions";
import type { FormContainerProps } from "./FormContainer";

const deleteActionMap = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  student: deleteStudent,
  exam: deleteExam,
  // other actions
  parent: deleteSubject,
  lesson: deleteSubject,
  assignment: deleteSubject,
  result: deleteSubject,
  attendance: deleteSubject,
  event: deleteSubject,
  announcement: deleteSubject,
};

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1 aria-live="polite">Loading...</h1>,
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <h1 aria-live="polite">Loading...</h1>,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <h1 aria-live="polite">Loading...</h1>,
});

const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: () => <h1 aria-live="polite">Loading...</h1>,
});

const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any,
  ) => JSX.Element;
} = {
  teacher: (setOpen, type, data, relatedData) => (
    <TeacherForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  student: (setOpen, type, data, relatedData) => (
    <StudentForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  subject: (setOpen, type, data, relatedData) => (
    <SubjectForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  class: (setOpen, type, data, relatedData) => (
    <ClassForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  exam: (setOpen, type, data, relatedData) => (
    <ExamForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) => {
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
    const router = useRouter();
    const [state, formAction] = useFormState(
      deleteActionMap[table as keyof typeof deleteActionMap],
      {
        success: false,
        error: false,
      },
    );

    useEffect(() => {
      if (state.success) {
        const tableName = table.charAt(0).toUpperCase() + table.slice(1);
        if (type === "delete") {
          toast(`${tableName} has been deleted successfully!`);
        } else {
          toast(
            `${tableName} has been ${
              type === "create" ? "created" : "updated"
            } successfully!`,
          );
        }
        router.refresh();
      }
    }, [state, type, setOpen]);

    return type === "delete" && id ? (
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <div className="flex flex-col justify-center items-center gap-4">
          <TriangleAlert
            className="size-20 text-[#FFC107]"
            aria-hidden="true"
          />
          <h2 id="modal-title" className="text-xl font-bold text-center">
            Confirm Deletion
          </h2>
          <p id="modal-description" className="text-gray-600 text-center">
            All data will be lost. Are you sure you want to delete this {table}?
          </p>
          <input type="hidden" name="id" value={id} />
          <button
            className="text-white bg-red-600 hover:bg-red-700 w-full p-3 rounded-md font-semibold transition-colors focus:ring-2 focus:ring-red-500 focus:outline-none"
            type="submit"
          >
            Delete
          </button>
        </div>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table] ? (
        forms[table](setOpen, type, data, relatedData)
      ) : (
        <p className="p-4">No form available for {table}</p>
      )
    ) : (
      <p className="p-4">Form not found!</p>
    );
  };

  const buttonLabel = `${type.charAt(0).toUpperCase() + type.slice(1)} ${table}`;

  return (
    <>
      <button
        className={
          type === "create"
            ? "button-rounded rounded-md w-full p-4  gap-2"
            : type === "delete"
              ? "button-rounded-delete"
              : "button-rounded-purple"
        }
        onClick={() => setOpen(true)}
        aria-label={buttonLabel}
        title={buttonLabel}
      >
        {type === "create" && (
          <>
            <Plus className="size-4 font-semibold" aria-hidden="true" />{" "}
            <span className="text-sm capitalize font-semibold">
              Add {table}
            </span>
          </>
        )}
        {type === "update" && <Edit className="icon" aria-hidden="true" />}
        {type === "delete" && <Trash2 className="icon" aria-hidden="true" />}
      </button>

      <div
        className={`fixed inset-0 z-40 transition-opacity duration-700 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        role="drawer"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div
          className="absolute inset-0 bg-black/40 "
          onClick={() => setOpen(false)}
          aria-hidden="true"
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
              aria-label="Close modal"
            >
              <X className="size-6" aria-hidden="true" />
            </button>

            <Form />
          </div>
        </div>
      </div>
    </>
  );
};

export default FormModal;
