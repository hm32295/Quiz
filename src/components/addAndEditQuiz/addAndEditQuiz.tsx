"use client";
import { StudentAsyncThunk } from "@/redux/Features/getStudent";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { groupAsyncThunk } from "@/redux/Features/getGroup";
import SelectBox from "../selectBox/selectBox";
import InputAdvanced from "../inputAdvanced/inputAdvanced";
import { QuestionAsyncThunk } from "@/redux/Features/questionApi";
import { setQuizAsyncThunk } from "@/redux/Features/setQuiz";
import { getQuizAsyncThunk } from "@/redux/Features/getQuizzes";
import { editQuizAsyncThunk } from "@/redux/Features/editQuiz";
import { hidden } from "@/redux/Features/createQuiz";
import QuizCreatedModal from "../quizCreatedModal/quizCreatedModal";
import { toast } from "react-toastify";
import Spinner from "../loading/spinnerComponent";
import { useTranslation } from "react-i18next";

interface GroupForm {
  _id?: string;
  title: string;
  description: string;
  group: string;
  questions_number: number;
  difficulty: "easy" | "medium" | "hard" | "";
  type: "FE" | "BE" | "DO" | "";
  duration: string;
  schadule: string;
  score_per_question: string;
}

export default function AddAndEditQuiz() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { data: dataGroup, isLoading: isLoadingGroup } = useSelector((state: any) => state.Group);
  const { value: openAddAndEdit } = useSelector((state: any) => state.createQuiz);
  const { isEdit: isEdit_ } = useSelector((state: any) => state.createQuiz);
  const { data: dataEdit } = useSelector((state: any) => state.createQuiz);
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [quizCreatedModal, setQuizCreatedModal] = useState(false);
  const [sampleCode, setSampleCode] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<GroupForm>({
    mode: "onChange",
  });

  useEffect(() => {
    if (isEdit_) {
      reset({ title: dataEdit.title });
    } else {
      reset({
        title: "",
        description: "",
        group: "",
        questions_number: 0,
        difficulty: "",
        type: "",
        duration: "",
        schadule: "",
        score_per_question: "",
      });
    }
  }, [isEdit_, reset, dataEdit]);

  const onSubmit = async (data: GroupForm) => {
    setLoading(true);
    try {
      if (dataEdit?._id) {
        const res = await dispatch(editQuizAsyncThunk({ data: { title: data.title }, id: dataEdit._id }) as any);
        if (res.error) toast.error(res.payload);
        if (res?.payload?.data) {
          reset({ title: "" });
          toast.success(res.payload.data.message || t("addAndEditQuiz.toast.updated"));
        }
        dispatch(hidden());
      } else {
        const res = await dispatch(setQuizAsyncThunk(data) as any);
        if (res.error) toast.error(res.payload);
        if (res?.payload?.data) {
          toast.success(res.payload.data.message || t("addAndEditQuiz.toast.added"));
          setSampleCode(res?.payload?.data?.code);
          setQuizCreatedModal(true);
          reset({
            title: "",
            description: "",
            group: "",
            questions_number: 0,
            difficulty: "",
            type: "",
            duration: "",
            schadule: "",
            score_per_question: "",
          });
        }
      }
      dispatch(getQuizAsyncThunk() as any);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handelDataGroup = () => {
    if (isLoadingGroup) return;
    return dataGroup.map((group: { name: string; _id: string }) => {
      return { label: group.name, value: group._id };
    });
  };

  useEffect(() => {
    dispatch(groupAsyncThunk() as any);
    dispatch(QuestionAsyncThunk() as any);
  }, [dispatch]);

  useEffect(() => {
    if (openAddAndEdit) dispatch(StudentAsyncThunk() as any);
  }, [openAddAndEdit, dispatch]);


  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(hidden());
    };
    document.addEventListener("keydown", handleKeyDown);

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        // setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch,openAddAndEdit]);



  if (!openAddAndEdit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 animate__animated animate__fadeIn" onClick={() => dispatch(hidden())} />

      <div className="relative w-full sm:w-[90%] md:w-[700px] max-h-screen overflow-y-auto bg-white shadow-2xl rounded-none sm:rounded-2xl p-4 sm:p-6 animate__animated animate__slideInUp">
        
        {/* header */}
        <div className="flex justify-between items-center border-b pb-1 mb-3">
          <h2 className="text-lg md:text-xl font-bold capitalize">
            {isEdit_ ? t("addAndEditQuiz.header.edit") : t("addAndEditQuiz.header.create")}
          </h2>
          <button onClick={() => dispatch(hidden())} className="cursor-pointer text-gray-600 hover:text-red-500 text-[18px]">✖</button>
        </div>

        {/* form */}
        <form id="groupForm" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <InputAdvanced
            label={t("addAndEditQuiz.form.title")}
            type="text"
            placeholder={t("addAndEditQuiz.form.titlePlaceholder")}
            error={errors.title?.message}
            {...register("title", { required: t("addAndEditQuiz.form.titleRequired") })}
          />

          {!isEdit_ && (
            <div className="flex justify-start gap-1 flex-wrap">
              <SelectBox width="100%" label={t("addAndEditQuiz.form.duration")} {...register("duration", { required: t("addAndEditQuiz.form.duration") })} options={[...Array(30)].map((_, i) => ({ label: String(i + 1), value: String(i + 1) }))} />

              <SelectBox width="100%" label={t("addAndEditQuiz.form.difficulty")} {...register("difficulty", { required: t("addAndEditQuiz.form.difficulty") })} options={[{ label: t("addAndEditQuiz.options.difficulty.hard"), value: "hard" }, { label: t("addAndEditQuiz.options.difficulty.easy"), value: "easy" }, { label: t("addAndEditQuiz.options.difficulty.medium"), value: "medium" }]} />

              <SelectBox width="100%" label={t("addAndEditQuiz.form.group")} {...register("group", { required: t("addAndEditQuiz.form.group") })} options={handelDataGroup()} />

              <SelectBox width="100%" label={t("addAndEditQuiz.form.type")} {...register("type", { required: t("addAndEditQuiz.form.type") })} options={[{ label: t("addAndEditQuiz.options.type.fe"), value: "FE" }, { label: t("addAndEditQuiz.options.type.be"), value: "BE" }, { label: t("addAndEditQuiz.options.type.do"), value: "DO" }]} />

              <SelectBox width="100%" label={t("addAndEditQuiz.form.questionsNumber")} {...register("questions_number", { required: t("addAndEditQuiz.form.questionsNumber") })} options={[...Array(30)].map((_, i) => ({ label: String(i + 1), value: String(i + 1) }))} />

              <InputAdvanced width="100%" label={t("addAndEditQuiz.form.schedule")} type="datetime-local" placeholder="Time" error={errors.schadule?.message} {...register("schadule", { required: t("addAndEditQuiz.form.schedule") })} />

              <SelectBox width="100%" label={t("addAndEditQuiz.form.scorePerQuestion")} {...register("score_per_question", { required: t("addAndEditQuiz.form.scorePerQuestion") })} options={[...Array(30)].map((_, i) => ({ label: String(i + 1), value: String(i + 1) }))} />

              <div className="flex bg-transparent flex-wrap w-full items-center">
                <div className="flex bg-transparent w-full items-center border rounded-lg overflow-hidden">
                  <label className="block p-6 h-full bg-[#FFEDDF] font-semibold text-sm sm:text-base">{t("addAndEditQuiz.form.description")}</label>
                  <textarea {...register("description", { required: t("addAndEditQuiz.form.descriptionRequired") })} rows={3} className="w-full focus:outline-none focus:ring-2 focus:ring-[#FFF]" />
                </div>
                {errors.description && <div className="text-red-500 w-full text-sm mt-1 capitalize">{errors.description.message}</div>}
              </div>
            </div>
          )}

          {/* footer */}
          <div className="flex flex-row-reverse">
            <button disabled={loading} type="submit" className="px-4 cursor-pointer py-1.5 rounded-xl bg-[#FFEDDF] hover:bg-[#ffd6b8] transition font-medium disabled:opacity-50">
              {loading ? <Spinner /> : (!isEdit_ ? t("addAndEditQuiz.footer.save") : t("addAndEditQuiz.footer.edit"))}
            </button>
          </div>
        </form>
      </div>

      <QuizCreatedModal isOpen={quizCreatedModal} onClose={() => { setQuizCreatedModal(false); dispatch(hidden()); }} code={sampleCode} />
    </div>
  );
}
