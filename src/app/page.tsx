import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="min-h-[82vh] flex justify-center items-center">
        <div className="border border-black w-1/2 min-h-[10vh] rounded-lg p-4">
          <div className="mb-3">
            <p className="font-semibold text-2xl"> Name: Hugo</p>
          </div>
          <div className="mb-3">
            <p className="font-semibold text-2xl">Email: hugo@gmail.com</p>
          </div>
          <div className="mb-3">
            <Link href={"/profile"}>Profile Update</Link>
          </div>
        </div>
      </div>
    </>
  );
}
