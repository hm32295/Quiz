"use client";

import { StudentAsyncThunk } from "@/redux/Features/getStudent";
import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import SelectBoxGroup from "../selectBoxGroup/selectBoxGroup";
import { SetGroupAsyncThunk } from "@/redux/Features/setGroup";
import { editGroupAsyncThunk } from "@/redux/Features/editGroup";
import { groupAsyncThunk } from "@/redux/Features/getGroup";
import { toast } from "react-toastify";
import Spinner from "../loading/spinnerComponent";
import TableSkeleton from "../loading/tableSkeletonLoader";
import { useTranslation } from "react-i18next";
import { AppDispatch, RootState } from "@/redux/store";

interface GroupForm {
  name: string;
  students: string[];
  _id?: string;
}

interface GroupModalProps {
  isOpen: boolean;
  dataUpdate?: GroupForm | null;
  isLoading?: boolean;
  setOpenModelEditAndAdd: () => void;
  onClose: () => void;
}

export default function AddAndEditGroup({
  isOpen,
  onClose,
  dataUpdate,
  setOpenModelEditAndAdd,
}: GroupModalProps) {
  const { t } = useTranslation();
  const [isAdd, setIsAdd] = useState(true);
  const [loading, setLoading] = useState(false);
  const { data: dataStudents, isLoading } = useSelector(
    (state: RootState) => state.Student
  );
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<GroupForm>({
    defaultValues: { name: "", students: [] },
    mode: "onChange",
  });

  const onSubmit = async (data: GroupForm) => {
    setLoading(true);
    try {
      let response;
      if (isAdd) {
        response = await dispatch(SetGroupAsyncThunk(data));
        if (response.payload?.message) {
          toast.success(
            response.payload.message ||
              t("addAndEditGroup_unique.toastAddSuccess")
          );
        }
      } else {
        response = await dispatch(
          editGroupAsyncThunk({ data, id: dataUpdate?._id || "" })
        );
        if (response.payload?.message) {
          toast.success(
            response.payload.message ||
              t("addAndEditGroup_unique.toastEditSuccess")
          );
        }
      }

      if (response?.payload && !response.payload.message) {
        toast.error(
          response?.payload || t("addAndEditGroup_unique.toastProcessFailed")
        );
      }

      dispatch(groupAsyncThunk());
      reset({ name: "", students: [] });
      setOpenModelEditAndAdd(false);
    } catch (err) {
      console.error("Failed to save group:", err);
      toast.error(t("addAndEditGroup_unique.toastError"));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (dataUpdate?.name) {
      reset({
        name: dataUpdate.name || "",
        students: dataUpdate.students ?? [],
      });
      setIsAdd(false);
    } else {
      reset({ name: "", students: [] });
      setIsAdd(true);
    }
  }, [dataUpdate, reset]);

  useEffect(() => {
    if (isOpen) {
      dispatch(StudentAsyncThunk());
    }
  }, [isOpen, dispatch]);

  if (!isOpen) return null;
  if (isLoading)
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={() => setIsOpenDropdown(false)}
      >
        <div
          className="absolute inset-0 bg-black/50 animate__animated animate__fadeIn"
          onClick={onClose}
        />
        <div className="relative w-full h-auto sm:w-[90%] md:w-[700px] bg-white shadow-2xl rounded-none sm:rounded-2xl p-4 sm:p-6 animate__animated animate__slideInUp">
          <TableSkeleton cols={1} rows={3} />
        </div>
      </div>
    );
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={() => setIsOpenDropdown(false)}
    >
      <div
        className="absolute inset-0 bg-black/50 animate__animated animate__fadeIn"
        onClick={onClose}
      />

      <div className="relative w-full h-auto sm:w-[90%] md:w-[700px] bg-white shadow-2xl rounded-none sm:rounded-2xl p-4 sm:p-6 animate__animated animate__slideInUp">
        <div className="flex justify-between items-center border-b pb-1 mb-3">
          <h2 className="text-lg md:text-xl font-bold capitalize">
            {isAdd
              ? t("addAndEditGroup_unique.titleAdd")
              : t("addAndEditGroup_unique.titleEdit")}
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-600 hover:text-red-500 text-[18px]"
          >
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <label className="block p-2 text-center bg-[#FFEDDF] h-full font-semibold text-sm sm:text-base">
                {t("addAndEditGroup_unique.groupNameLabel")}
              </label>
              <input
                {...register("name", {
                  required: t("addAndEditGroup_unique.groupNameRequired"),
                })}
                className="w-full p-1 focus:outline-none focus:ring-2 focus:ring-[#FFEDDF]"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <SelectBoxGroup
            dataUpdata={dataUpdate}
            data={dataStudents || []}
            setValue={setValue}
            setOpenDropdown={setIsOpenDropdown}
            openDropdown={isOpenDropdown}
          />

          <div className="flex flex-row-reverse">
            <button
              type="submit"
              disabled={loading}
              className="px-4 cursor-pointer py-1.5 rounded-xl bg-[#FFEDDF] hover:bg-[#ffd6b8] transition font-medium disabled:opacity-50"
            >
              {loading ? (
                <Spinner />
              ) : isAdd ? (
                t("addAndEditGroup_unique.buttonSave")
              ) : (
                t("addAndEditGroup_unique.buttonEdit")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
