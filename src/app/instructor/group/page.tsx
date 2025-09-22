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
import { toast } from "react-toastify";
import TableSkeleton from "@/components/loading/tableSkeletonLoader";
import NoData from "@/components/no-data/noData";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "@/redux/store";

interface Group {
  _id: string;
  name: string;
  students: string[];
  max_students: number;
  status: string;
}

interface typeView {
  label: string;
  value: string;
}

export default function GroupsList() {
  const { t } = useTranslation();
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const { data, isLoading } = useSelector((state: any) => state.Group);
  const [openViewData, setOpenViewData] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<Group | null>(null);
  const [viewData, setViewData] = useState<typeView[]>([]);
  const [openModelEditAndAdd, setOpenModelEditAndAdd] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(groupAsyncThunk());
  }, [dispatch]);

  const update = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenModelEditAndAdd(true);
  };

  const deleteGroup = async () => {
    setOpenDeleteConfirm(false);
    if (dataUpdate?._id) {
      try {
        const response = await dispatch(deleteGroupAsyncThunk(dataUpdate._id));
        if (response.payload.message) {
          toast.success(response.payload.message || t("groupsListPage.messages.deleteSuccess"));
        }
        if (response?.payload) {
          toast.error(response?.payload || t("groupsListPage.messages.deleteError"));
        }
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(groupAsyncThunk());
  };

  const handelDataToView = (group: Group) => {
    if (!group?.name) return;

    setOpenViewData(true);
    setViewData([
      { label: t("groupsListPage.labels.groupName"), value: group.name },
      { label: t("groupsListPage.labels.groupId"), value: group._id },
      { label: t("groupsListPage.labels.maxStudents"), value: group.max_students.toString() },
      { label: t("groupsListPage.labels.groupStatus"), value: group.status }
    ]);
  };

  if (isLoading) {
    return <TableSkeleton rows={5} cols={2} />;
  }

  return (
    <div className="p-1 max-w-5xl mx-auto">
      <div className="flex justify-between p-3 ">
        <h2 className="font-bold capitalize">{t("groupsListPage.title")}</h2>
        <button
          onClick={() => {
            setOpenModelEditAndAdd(true);
            setDataUpdate(null);
          }}
          className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition"
        >
          <FaPlusCircle />
          {t("groupsListPage.buttons.addGroup")}
        </button>
      </div>

      {/* grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data.length === 0 ? (
          <NoData />
        ) : (
          data?.map((group: Group) => (
            <div
              key={group._id}
              className="animate__animated animate__fadeInUp flex justify-between items-center border rounded-xl shadow-sm p-4 bg-white hover:shadow-md transition duration-300"
            >
              <div>
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                  {t("groupsListPage.labels.group")}: {group?.name}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm">
                  {t("groupsListPage.labels.studentsCount")}: {group?.students?.length}
                </p>
              </div>

              <div
                onClick={() => setDataUpdate(group)}
                className="flex gap-3 text-gray-600"
              >
                <button
                  onClick={(e) => {
                    update(e);
                  }}
                  className="hover:text-blue-500 cursor-pointer transition duration-200"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() => {
                    setOpenDeleteConfirm(true);
                  }}
                  className="hover:text-red-500 cursor-pointer transition duration-200"
                >
                  <FaTrash size={18} />
                </button>
                <button
                  onClick={() => {
                    handelDataToView(group);
                  }}
                  className="hover:text-green-500 cursor-pointer transition duration-200"
                >
                  <BiSolidShow size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <AddAndEditGroup
        dataUpdate={dataUpdate}
        setOpenModelEditAndAdd={setOpenModelEditAndAdd}
        isOpen={openModelEditAndAdd}
        onClose={() => setOpenModelEditAndAdd(false)}
      />

      <ConfirmDeleteModal
        isOpen={openDeleteConfirm}
        onCancel={() => setOpenDeleteConfirm(false)}
        onConfirm={deleteGroup}
      />

      <ViewDataModal
        isOpen={openViewData}
        onClose={() => setOpenViewData(false)}
        title={t("groupsListPage.labels.group")}
        data={viewData}
      />
    </div>
  );
}
