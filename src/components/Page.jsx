import { useRouter } from "../utils";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter((state) => state.current);

  useEffect(() => {
    console.log(router);
  }, [router]);

  return (
    <div className="bg-[#191919] h-screen w-full text-white">
      {router || "Select Page"}
    </div>
  );
};

export default Page;
