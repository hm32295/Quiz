import Image from "next/image";
import auth from '../../../public/auth.png'

export default function Page() {
  return (
    <div className="p-[50px] bg-[#0D1321] flex gap-[50px]">
      <div className="w-[50%]">
          <input type="text" placeholder="next to email" className="p-4 bg-white text-black" />
      </div>
      <div className="bg-[#FFEDDF] pl-[48px] pr-[48px] rounded-[20px] w-[50%]">
        <Image alt="auth" src={auth} className="w-full"/>
      </div>
    </div>
  )
}
