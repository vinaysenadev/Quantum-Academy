"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { z } from "zod";
import InputField from "../InputField";
import { Upload, UploadCloud } from "lucide-react";
import {
  studentSchema,
  StudentSchema,
  teacherSchema,
  TeacherSchema,
} from "@/lib/formValidationSchema";
import { useFormState } from "react-dom";
import {
  createStudent,
  createTeacher,
  updateStudent,
  updateTeacher,
} from "@/lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";

const StudentForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
  });

  const [img, setImg] = useState<any>(
    data?.img ? { secure_url: data.img } : null,
  );
  const [state, formAction] = useFormState(
    type === "create" ? createStudent : updateStudent,
    {
      success: false,
      error: false,
    },
  );
  const { grades, classes } = relatedData;

  useEffect(() => {
    if (state.success) {
      toast(
        `Student has been ${type === "create" ? "created" : "updated"} successfully!`,
      );
      setOpen(false);
      router.refresh();
    }
  }, [state, type, setOpen]);

  const onSubmit = (data: StudentSchema) => {
    formAction({
      ...data,
      img: img?.secure_url || data?.img || "",
    });
  };
  return (
    <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new student" : "Update the student"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>

      <div className="flex flex-col gap-2">
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>

      <span className="text-xs text-gray-500 font-medium mt-2">
        Personal Information
      </span>

      <div className="flex flex-col gap-2">
        <InputField
          label="Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="SurName"
          name="surname"
          defaultValue={data?.surname}
          register={register}
          error={errors.surname}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="Blood Type"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors.bloodType}
        />
        <InputField
          label="Birthday"
          name="birthday"
          defaultValue={data?.birthday?.toISOString().split("T")[0]}
          register={register}
          type="date"
        />
        <InputField
          label="Parent Id"
          name="parentId"
          defaultValue={data?.parentId}
          register={register}
          error={errors.parentId}
        />
        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
      </div>
      <div className="flex flex-col gap-1.5 mt-2 ">
        <label className="text-xs text-gray-500">Sex</label>
        <select
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          {...register("sex")}
          // defaultValue={data?.sex}
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
        {errors.sex?.message && (
          <p className="text-xs text-red-400">
            {errors.sex.message.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1.5 mt-2 ">
        <label className="text-xs text-gray-500">Grades</label>
        <select
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          {...register("gradeId")}
        >
          {grades.map((grade: { id: number; level: string }) => (
            <option
              value={grade.id}
              key={grade.id}
              // selected={
              //   data && data.subjects.some((sub: any) => sub.id === subject.id)
              // }
            >
              {grade.level}
            </option>
          ))}
        </select>
        {errors.gradeId?.message && (
          <p className="text-xs text-red-400">
            {errors.gradeId.message.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1.5 mt-2 ">
        <label className="text-xs text-gray-500">Classes</label>
        <select
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          {...register("classId")}
          defaultValue={data?.classId}
        >
          {classes.map(
            (classItem: {
              id: number;
              name: string;
              capacity: number;
              _count: { students: number };
            }) => (
              <option
                value={classItem.id}
                key={classItem.id}
                // selected={
                //   data && data.subjects.some((sub: any) => sub.id === subject.id)
                // }
              >
                {classItem.name} - {classItem._count.students}/
                {classItem.capacity} capacity
              </option>
            ),
          )}
        </select>
        {errors.classId?.message && (
          <p className="text-xs text-red-400">
            {errors.classId.message.toString()}
          </p>
        )}
      </div>
      <div className="flex gap-2 items-center justify-center my-3 border-[1.5px] p-2">
        <UploadCloud />
        <CldUploadWidget
          uploadPreset="quantumSms"
          onSuccess={(result, { widget }) => {
            setImg(result.info);
            widget.close();
          }}
        >
          {({ open }) => {
            return (
              <button type="button" onClick={() => open()}>
                Upload an Image
              </button>
            );
          }}
        </CldUploadWidget>
        {img?.secure_url && (
          <img
            src={img?.secure_url}
            alt=""
            className="w-10 h-10 rounded-full overflow-hidden"
          />
        )}
      </div>

      <button
        type="submit"
        className="w-full p-2 rounded-md bg-blue-400 text-white"
      >
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentForm;
