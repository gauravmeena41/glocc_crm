import React from "react";
import Image from "next/image";

const profile = () => {
  return (
    <div>
      <div className="relative w-full h-[187px]">
        <Image
          src="https://images.unsplash.com/photo-1646546487804-85320b3b2540?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1110&q=80"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <div className="w-[100px] h-[100px] rounded-full relative top-[40px] m-auto border-2 z-[1]">
          <Image
            src="https://images.unsplash.com/photo-1646546487804-85320b3b2540?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1110&q=80"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div className="absolute bottom-2 w-full flex justify-center items-center z-[1]">
          <div className="flex space-x-16">
            <h1 className="text-white font-semibold">CE/2021/12/273</h1>
            <h1 className="text-white font-semibold">Developer Trainee</h1>
            <h1 className="text-white font-semibold">Engineering</h1>
            <h1 className="text-white font-semibold">
              gurumeena41.gm@gmail.com
            </h1>
          </div>
        </div>
        <div className="w-full h-[150px] shadow-inner-shadow absolute bottom-0"></div>
      </div>
    </div>
  );
};

export default profile;
