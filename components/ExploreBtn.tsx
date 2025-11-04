"use client";

import Image from "next/image";

const ExploreBtn = () => {
  return (
    <button className="mt-7 mx-auto" type="button" id="explore-btn">
      <a href="#events">
        Explore Events{" "}
        <Image
          alt="arrow-down"
          src={"/icons/arrow-down.svg"}
          width={24}
          height={24}
        />
      </a>
    </button>
  );
};

export default ExploreBtn;
