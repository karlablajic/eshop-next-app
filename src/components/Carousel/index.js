import { useMemo, useState } from 'react';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs';

export default function Carousel({ slides }) {
  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="overflow-hidden relative  max-w-[400px]">
      <div
        className={`flex transition ease-out duration-40 `}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}>
        {slides.map((image) => {
          return <img key={image.asset_id} src={image.url} className="object-contain" />;
        })}
      </div>

      <div className=" absolute top-0 h-full w-full  justify-between items-center flex px-[12px] text-white text-3xl ">
        <button onClick={previousSlide}>
          <BsFillArrowLeftCircleFill className="text-gray-800" />
        </button>
        <button onClick={nextSlide}>
          <BsFillArrowRightCircleFill className="text-gray-800" />
        </button>
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center items-center gap-3 w-full">
        {slides.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={'circle' + i}
              className={`z-0 rounded-full w-3 h-3 cursor-pointer  ${i == current ? 'bg-gray-600 w-4 h-4' : 'bg-gray-300'}`}></div>
          );
        })}
      </div>
    </div>
  );
}
