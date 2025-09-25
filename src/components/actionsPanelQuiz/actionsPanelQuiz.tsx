"use client";
import Image from "next/image";
import { FaPlusCircle, FaQuestionCircle } from "react-icons/fa";
import "animate.css";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

type ActionCardProps = {
  title: string;
  icon?: React.ReactNode;
  image?: string;
  onClick?: () => void;
};

const ActionCard = ({ title, icon, image, onClick }: ActionCardProps) => {
  return (
    <div
      onClick={onClick}
      className="
        w-[220px] h-[140px] 
        flex flex-col items-center justify-center 
        rounded-xl border border-gray-200 bg-white shadow-md 
        cursor-pointer 
        hover:shadow-lg hover:scale-105 
        transition-all duration-300 
        animate__animated animate__fadeIn
      "
    >
      {/* Icon / Image */}
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100">
        {image ? (
          <Image
            src={image}
            alt={title}
            width={48}
            height={48}
            className="w-12 h-12"
          />
        ) : (
          <span className="text-gray-700 text-4xl">{icon}</span>
        )}
      </div>

      {/* Text */}
      <p className="mt-3 text-center text-sm font-medium text-gray-800 capitalize">
        {title}
      </p>
    </div>
  );
};

export default function ActionsPanel({
  onClick,
  type,
}: {
  onClick: () => void;
  type?: "student";
}) {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="mb-3 flex flex-wrap justify-start gap-0 sm-gap-4">

      <ActionCard
        title={
          type
            ? t("actionsPanel_joinQuiz")
            : t("actionsPanel_setupQuiz")
        }
        icon={<FaPlusCircle />}
        onClick={() => onClick()}
      />
      {!type && (
        <ActionCard
          title={t("actionsPanel_questionBank")}
          icon={<FaQuestionCircle />}
          onClick={() => router.push("/instructor/questions")}
        />
      )}
    </div>
  );
}
