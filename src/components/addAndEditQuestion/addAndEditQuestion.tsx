"use client";

import { useEffect } from "react";

interface QuestionModalProps {
  isOpen: boolean;
  isLoading:any;
  onClose: () => void;
  register: any;
  edit:boolean
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function AddAndEditQuestion({isOpen, edit, onClose, isLoading,register, onSubmit,
}: QuestionModalProps) {
  

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
      
      <div
        className="absolute inset-0 bg-black/50 animate-fadeIn"
        onClick={onClose}
      />


      <div
        className="
          relative w-full h-auto sm:w-[90%] md:w-[700px] 
          bg-white shadow-2xl rounded-none sm:rounded-2xl 
          p-4 sm:p-6 overflow-y-auto animate-slideUp
        "
      >
        
        
        <div className="flex justify-between items-center border-b pb-1 mb-3">
          <h2 className="text-lg md:text-xl font-bold capitalize">
            {edit ? "edit " : "Set up a new "} question
          </h2>
            <button
                onClick={onClose}
                className="cursor-pointer text-gray-600 hover:text-red-500 text-[18px]"
                >
                ✖
            </button>
        </div>


        <form
          id="questionForm"
          onSubmit={onSubmit}
          className="flex flex-col gap-2"
        >
          <div className="flex bg-transparent  items-center border rounded-lg overflow-hidden">
            <label className="block p-2 bg-[#FFEDDF] h-full font-semibold text-sm sm:text-base">
              Title
            </label>
            <input
              {...register("title")}
              
              className="w-full  p-1 focus:outline-none focus:ring-2 focus:ring-[#FFF]"
              />
          </div>

            <div className="flex bg-transparent  items-center border rounded-lg overflow-hidden">
                <label className="block p-6 h-full bg-[#FFEDDF] font-semibold text-sm sm:text-base">
                    Description
                </label>
                <textarea
                
                  {...register("description")}
                  rows={3}
                  className="w-full focus:outline-none focus:ring-2 focus:ring-[#FFF] "
                />
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-2">
            {["A", "B", "C", "D"].map((option) => (
              <div key={option} className="bg-white flex items-center border rounded-lg overflow-hidden">
                <label className="p-2 bg-[#FFEDDF] h-full block font-semibold mb-1 text-sm sm:text-base">
                  {option}
                </label>
                <input
                  {...register(`${option}`)}
                
                  className="w-full  p-1 focus:outline-none focus:ring-2 focus:ring-[#FFF]"
                />
              </div>
            ))}
          </div>

          <div className="flex bg-transparent items-center border rounded-lg overflow-hidden">
            <label className="block capitalize p-2 text-center bg-[#FFEDDF] h-full font-semibold text-sm sm:text-base">
              Right Answer
            </label>
            <select
              {...register("answer")}
              className="w-full p-2 capitalize text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#fff] bg-white h-full"
            >
              <option value="" className="text-gray-400 capitalize bg-gray-100">
                { 'Select Right Answer'}
              </option>
              {['A', 'B', 'C','D' ].map(ele=>{
                 return  <option key={ele} value={ele} className="text-gray-700 capitalize bg-[#FFEDDF]">{ele}</option>
            
              })}
             
             
            </select>
          </div>


          <div className="flex bg-transparent items-center border rounded-lg overflow-hidden">
            <label className="block capitalize p-2 text-center bg-[#FFEDDF] h-full font-semibold text-sm sm:text-base">
              Difficulty level
            </label>
            <select
              {...register("difficulty")}
              className="w-full p-2 capitalize text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#fff] bg-white h-full"
            >
              <option value="" className="text-gray-400 capitalize mb-2 border-2 bg-gray-100">
                 {'Select Difficulty level'}
              </option>
              {['easy', 'medium', 'hard'].map(ele=>{
                return  <option key={ele} value={ele} className="text-gray-700 capitalize bg-[#FFEDDF]">{ele}</option>
                
                  
              })}
             
             
            </select>
          </div>


          <div className="flex bg-transparent items-center border rounded-lg overflow-hidden">
            <label className="block capitalize p-2 text-center bg-[#FFEDDF] h-full font-semibold text-sm sm:text-base">
              category type
            </label>
            <select
              {...register("type")}
              className="w-full p-2 capitalize text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#fff] bg-white h-full"
            >
              <option value="" className="text-gray-400 capitalize bg-gray-100">
               {'Select category'} 
              </option>
              {['FE', 'BE', 'DO'].map(ele=>{
                 return  <option key={ele} value={ele} className="text-gray-700 capitalize bg-[#FFEDDF]">{ele}</option>
               
                
              })}
             
             
            </select>
          </div>
          

          <div className="flex flex-row-reverse">
             <button
                    type="submit"
                    disabled ={isLoading}
                    form="questionForm"
                    className="px-4 capitalize cursor-pointer py-1.5 rounded-xl bg-[#FFEDDF] hover:bg-[#ffd6b8] transition font-medium"
                >
                    {isLoading? '... Loading' :(edit ? 'edit':" ✔ Save")}                  
                    
                </button>
          </div>
        </form>
      </div>
    </div>
  );
}
