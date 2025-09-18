"use client";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import { BiSolidShow } from "react-icons/bi";
import AddAndEditGroup from "@/components/addAndEditGroup/addAndEditGroup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { groupAsyncThunk } from "@/redux/Features/getGroup";
import ConfirmDeleteModal from "@/components/confirmDeleteModal/confirmDeleteModal";
import { deleteGroupAsyncThunk } from "@/redux/Features/deleteGroup";
import ViewDataModal from "@/components/viewData/viewData";

interface Group {
  _id: number;
  name: string;
  students: string[];
  max_students:number;
  status:string;
}

interface typeView{
  label: string;
  value:string
}
export default function GroupsList() {
  const [openDeleteConfirm , setOpenDeleteConfirm] = useState(false)
  const {data}= useSelector(state=> state.Group)
  const [openViewData , setOpenViewData] = useState(false)
  const [dataUpdate , setDataUpdate] = useState<Group | null>();
  const [viewData , setViewData] = useState<typeView[]>([])
  const [openModelEditAndAdd,setOpenModelEditAndAdd] = useState(false);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(groupAsyncThunk())
  },[dispatch])

  const update =(e:any)=>{
    e.preventDefault()
    setOpenModelEditAndAdd(true)
  }

    const deleteGroup = async ()=>{
      setOpenDeleteConfirm(false)  
      if(dataUpdate?._id){
        await dispatch(deleteGroupAsyncThunk(dataUpdate._id))
        dispatch(groupAsyncThunk())
      }
    }

    const handelDataToView = (group:Group)=>{
      if(!group?.name) return
     
      setOpenViewData(true);
      if(group){
        setViewData([
          { label: "Group name", value: group.name },
          { label: "Group id", value: group._id.toString() },
          { label: "max students", value: group.max_students.toString() },
          { label: "Group status", value: group.status },
        ]);
      }
    }
  return (
    <div className="p-6 max-w-5xl mx-auto">
          <div className="flex justify-between p-3 ">
            <h2 className="font-bold capitalize">Groups list</h2>
            <button
            onClick={()=>{setOpenModelEditAndAdd(true);setDataUpdate({})}} className="flex items-center gap-1 cursor-pointer">
              <FaPlusCircle  />
              Add Question
            </button>
          </div>
            {/* grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {
              data?.map((group:Group) => (
                <div
                  key={group._id}
                  className="animate__animated animate__fadeInUp flex justify-between items-center border rounded-xl shadow-sm p-4 bg-white hover:shadow-md transition duration-300"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                      Group : {group?.name}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      No. of students : {group?.students?.length}
                    </p>
                  </div>

                  <div onClick={()=>setDataUpdate(group)} className="flex gap-3 text-gray-600">
                    <button onClick={(e)=>{update(e);}} className="hover:text-blue-500 cursor-pointer transition duration-200">
                      <FaEdit size={18} />
                    </button>
                    <button onClick={()=>{setOpenDeleteConfirm(true)}} className="hover:text-red-500 cursor-pointer transition duration-200">
                      <FaTrash size={18} />
                    </button>
                    <button onClick={()=>{handelDataToView(group)}} className="hover:text-green-500 cursor-pointer transition duration-200">
                      <BiSolidShow  size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <AddAndEditGroup
                      dataUpdate  = {dataUpdate}
                      setOpenModelEditAndAdd={setOpenModelEditAndAdd}
                      isOpen={openModelEditAndAdd}
                      onClose={() => setOpenModelEditAndAdd(false)}
                    />

            <ConfirmDeleteModal 
                isOpen={openDeleteConfirm} 
                onCancel={()=>setOpenDeleteConfirm(false)} 
                onConfirm={deleteGroup} 
            />
            <ViewDataModal
                isOpen={openViewData}
                onClose={() => setOpenViewData(false)}
                title="Question "
                data={viewData}
              />
    </div>
  );
}
