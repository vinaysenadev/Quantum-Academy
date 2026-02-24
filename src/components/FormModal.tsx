"use client";

import { deleteClass, deleteSubject, deleteTeacher } from "@/lib/actions";
import { Plus, Edit, Trash2, X, TriangleAlert } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import type { FormContainerProps } from "./FormContainer";

const deleteActionMap = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  student: deleteSubject,
  exam: deleteSubject,
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
  loading: () => <h1>Loading...</h1>,
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <h1>Loading...</h1>,
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
  // student: (setOpen, type, data, relatedData) => (
  //   <StudentForm
  //     type={type}
  //     data={data}
  //     setOpen={setOpen}
  //     relatedData={relatedData}
  //   />
  // ),
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
    const [state, formAction] = useFormState(deleteActionMap[table], {
      success: false,
      error: false,
    });

    useEffect(() => {
      if (state.success) {
        const tableName = table.charAt(0).toUpperCase() + table.slice(1);
        if (type === "delete") {
          toast(`${tableName} has been deleted successfully!`);
        } else {
          toast(
            `${tableName} has been ${type === "create" ? "created" : "updated"} successfully!`,
          );
        }
        router.refresh();
      }
    }, [state, type, setOpen]);

    return type === "delete" && id ? (
      <form action={formAction}>
        <div className="flex flex-col justify-center items-center h-[90vh] gap-4">
          <TriangleAlert className="icon size-40 text-[#FFC107]" />
          <span className="text-xl text-center">
            All data will be lost. Are you sure you want to delete this {table}?
          </span>
          <input type="text | number" name="id" value={id} hidden />
          <button
            className="text-white bg-red-500 w-full p-3 rounded-md"
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
        <p>No form available for {table}</p>
      )
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
        {type === "create" && <Plus className="icon" />}
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
