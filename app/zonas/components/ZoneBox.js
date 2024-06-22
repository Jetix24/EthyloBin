"use client";

const ZoneBox = () => {
  return (
    <div
      onClick={handleClick}
      className="
          w-full
          relative
          flex
          items-center
          space-x-3
          p-3
          my-1
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer"
    >
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div
            className="
                flex
                justify-between
                items-center
                mb-1
              "
          >
            <p
              className="
                  text-sm
                  font-medium
                  text-white
                "
            >
              {data.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoneBox;
