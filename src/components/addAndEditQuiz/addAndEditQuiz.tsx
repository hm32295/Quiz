"use client";
import { StudentAsyncThunk } from "@/redux/Features/getStudent";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Dispatch } from "@reduxjs/toolkit";
import { groupAsyncThunk } from "@/redux/Features/getGroup";
import SelectBox from "../selectBox/selectBox";
import InputAdvanced from "../inputAdvanced/inputAdvanced";
import { QuestionAsyncThunk } from "@/redux/Features/questionApi";
import { setQuizAsyncThunk } from "@/redux/Features/setQuiz";
import { getQuizAsyncThunk } from "@/redux/Features/getQuizzes";
import { editQuizAsyncThunk } from "@/redux/Features/editQuiz";
import { hidden } from "@/redux/Features/createQuiz";

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

interface GroupModalProps {
  dataUpdate:GroupForm
  isLoading?: boolean;
  isEdit? : boolean
}

export default function AddAndEditQuiz({
  dataUpdate,isEdit
}: GroupModalProps) {

  const { data: dataGroup ,isLoading : isLoadingGroup} = useSelector((state: any) => state.Group);
   const openAddAndEdit= useSelector((state:any)=> state.createQuiz.value);
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  

  // ✅ react-hook-form
  const {register,handleSubmit,reset,formState: { errors } } = useForm<GroupForm>({
    mode: "onChange",
  });
  useEffect(()=>{
    if(dataUpdate && isEdit){
     
      reset({
        title:dataUpdate.title,
        description: dataUpdate.description,
        group: dataUpdate.group,
        questions_number: dataUpdate.questions_number,
        difficulty: dataUpdate.difficulty,
        type: dataUpdate.type,
        duration: dataUpdate.duration,
        schadule: dataUpdate.schadule,
        score_per_question: dataUpdate.score_per_question,
      })
    }else{
     
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
        })
    }
    
  },[dataUpdate])


const onSubmit = async(data:GroupForm)=>{
  if(dataUpdate?._id){
    await dispatch(editQuizAsyncThunk({data:{title :data.title},id:dataUpdate._id}) as any)
      console.log('edit');
  }
  else{
    await dispatch(setQuizAsyncThunk(data) as any)
    
  }
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
        })
    dispatch(getQuizAsyncThunk() as any)
    dispatch(hidden())
    
  }

  // Handel Data Group
  const handelDataGroup =()=>{
    if(isLoadingGroup) return
    return dataGroup.map((group)=>{
        return {label : group.name, value: group._id}
      })
  }


 useEffect(() => {
   dispatch(groupAsyncThunk() as any)
   dispatch(QuestionAsyncThunk() as any)
  
}, [dispatch]);


  // get Students From Api
  useEffect(() => {
    if (openAddAndEdit) {
      dispatch(StudentAsyncThunk() as any);
    }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center" >
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/50 animate__animated animate__fadeIn"
        onClick={()=>dispatch(hidden())}
      />

      {/* modal content */}
      <div
        className="    relative w-full sm:w-[90%] md:w-[700px]  max-h-screen overflow-y-auto
        bg-white shadow-2xl rounded-none sm:rounded-2xl p-4 sm:p-6 animate__animated animate__slideInUp"
        >
        {/* header */}
        <div className="flex justify-between items-center border-b pb-1 mb-3">
          <h2 className="text-lg md:text-xl font-bold capitalize">
            {isEdit ? 'edit' : 'Set up a new'} Quiz
          </h2>
          <button
            onClick={()=>dispatch(hidden())}
            className="cursor-pointer text-gray-600 hover:text-red-500 text-[18px]"
          >
            ✖
          </button>
        </div>

        {/* form */}
        <form
          id="groupForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
        
            <InputAdvanced label="title" type="text" placeholder="title quiz" error={errors.title?.message} {...register("title", { required: "title quiz is required",})}/>
            {isEdit ? "" : 
                <div className="flex justify-start gap-1 flex-wrap">
                    <div className="flex justify-start gap-1 flex-wrap w-full">
                      <SelectBox 
                        width={'100%'} 
                        error={errors.duration?.message}
                        label="Duration (in minutes)" 
                        {...register('duration',{required: 'the field is required'})} 
                        options={[...Array(30)].map((_, i) =>{
                          return  {label: String(i+1), value: String(i + 1)}
                        })} 
                        // options={[{label: "10", value:10},{label: "20", value:20},{label: "15", value:15}]} 
                      />
                      <SelectBox 
                        width={'100%'} 
                        label="difficulty"
                        error={errors.difficulty?.message}
                        {...register('difficulty',{required: 'the field is required'})} 
                        options={[{label: "hard", value:"hard"},{label: "easy", value:"easy"},{label: "medium", value:"medium"}]} 
                      />
                      <SelectBox 
                        width={'100%'} 
                        label="group name" 
                        error={errors.group?.message}
                        {...register('group',{required: 'the field is required'})} 
                        options={handelDataGroup()} 
                      />
                      <SelectBox 
                        width={'100%'} 
                        label="type"
                        error={errors.type?.message}
                        {...register('type',{required: 'the field is required'})} 
                        options={[{label: "FE", value:"FE"},{label: "BE", value:"BE"},{label: "DO", value:"DO"}]} 
                      />
                      <SelectBox 
                        width={'100%'} 
                        label="questions number" 
                        error={errors.questions_number?.message}
                        {...register('questions_number',{required: 'the field is required'})}
                        options={[...Array(30)].map((_, i) =>{
                          return  {label: String(i+1), value: String(i + 1)}
                        })} 
                         />
                    </div>
                    <InputAdvanced width="100%" label="data" type="datetime-local" placeholder="Time" error={errors.schadule?.message} {...register('schadule',{required:'the field is required'})}/>
                    <div className="flex justify-start gap-1 flex-wrap w-full">
                      <SelectBox 
                        width={'100%'} 
                        label="score per question"
                        error={errors.score_per_question?.message}  
                        {...register('score_per_question',{required : 'the field is required'})} 
                        options={[...Array(30)].map((_, i) =>{
                            return  {label: String(i+1), value: String(i + 1)}
                          })}  
                      />
                  
                    </div>
                  <div className="flex bg-transparent flex-wrap  w-full  items-center">
                        <div className="flex bg-transparent   w-full  items-center border rounded-lg overflow-hidden">

                          <label className="block p-6 h-full bg-[#FFEDDF] font-semibold text-sm sm:text-base">
                              Description
                          </label>
                          <textarea
                          
                            {...register("description" , {required:'the field is required'})}
                            rows={3}
                            className="w-full focus:outline-none focus:ring-2 focus:ring-[#FFF] "
                          />
                        </div>
                        { errors && <div className="text-red-500 w-full text-sm mt-1 capitalize">{ errors.description?.message}</div>}
                  </div>
                </div>
            }
          
          {/* footer */}
          <div className="flex flex-row-reverse">
            <button
              type="submit"
              className="px-4 cursor-pointer py-1.5 rounded-xl bg-[#FFEDDF] hover:bg-[#ffd6b8] transition font-medium disabled:opacity-50"
            >
              {0 ? "... Loading" : (!isEdit?"✔ Save" : '✔ Edit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
