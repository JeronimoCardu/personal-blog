"use client";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="border-1 cursor-pointer border-black rounded-full p-2 text-2xl "
    >
      <IoArrowBack />
    </button>
  );
}
