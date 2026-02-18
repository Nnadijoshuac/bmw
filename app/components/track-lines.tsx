import { forwardRef } from "react";

type TrackLinesProps = {
  variant: "one" | "two";
};

const TrackLines = forwardRef<HTMLDivElement, TrackLinesProps>(function TrackLines(
  { variant },
  ref
) {
  const isOne = variant === "one";

  const wrapperClass = isOne
    ? "left-[-34vw] bottom-[4vh] h-[36vh] w-[230vw] [transform:perspective(1100px)_rotateX(72deg)_rotateZ(-45deg)_skewX(-4deg)] max-[960px]:left-[-46vw] max-[960px]:bottom-[9vh] max-[960px]:h-[30vh] max-[960px]:w-[280vw] max-[960px]:[transform:perspective(820px)_rotateX(74deg)_rotateZ(-45deg)]"
    : "left-[24vw] bottom-[-9vh] h-[30vh] w-[210vw] [transform:perspective(980px)_rotateX(72deg)_rotateZ(-45deg)_skewX(-3deg)] max-[960px]:left-[16vw] max-[960px]:bottom-[-3vh] max-[960px]:h-[24vh] max-[960px]:w-[280vw] max-[960px]:[transform:perspective(780px)_rotateX(74deg)_rotateZ(-45deg)]";

  const mainStyle = {
    background:
      isOne
        ? "linear-gradient(97deg,#7fd4ff 0%,#7fd4ff 100%) 0 40%/100% 30px no-repeat,linear-gradient(97deg,#0d47a1 0%,#0d47a1 100%) 0 50%/100% 30px no-repeat,linear-gradient(97deg,#c62828 0%,#c62828 100%) 0 60%/100% 30px no-repeat"
        : "linear-gradient(97deg,#7fd4ff 0%,#7fd4ff 100%) 0 40%/100% 24px no-repeat,linear-gradient(97deg,#0d47a1 0%,#0d47a1 100%) 0 50%/100% 24px no-repeat,linear-gradient(97deg,#c62828 0%,#c62828 100%) 0 60%/100% 24px no-repeat",
  };

  const depthStyle = {
    background:
      isOne
        ? "linear-gradient(97deg,rgba(127,212,255,.7) 0%,rgba(127,212,255,0) 100%) 0 40%/100% 8px no-repeat,linear-gradient(97deg,rgba(13,71,161,.78) 0%,rgba(13,71,161,0) 100%) 0 50%/100% 8px no-repeat,linear-gradient(97deg,rgba(198,40,40,.78) 0%,rgba(198,40,40,0) 100%) 0 60%/100% 8px no-repeat"
        : "linear-gradient(97deg,rgba(127,212,255,.45) 0%,rgba(127,212,255,0) 100%) 0 40%/100% 6px no-repeat,linear-gradient(97deg,rgba(13,71,161,.5) 0%,rgba(13,71,161,0) 100%) 0 50%/100% 6px no-repeat,linear-gradient(97deg,rgba(198,40,40,.5) 0%,rgba(198,40,40,0) 100%) 0 60%/100% 6px no-repeat",
  };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 ${wrapperClass}`}
    >
      <div
        className="absolute inset-0 opacity-95"
        style={mainStyle}
      />
      <div
        className="absolute inset-0 opacity-90 blur-[1px]"
        style={depthStyle}
      />
    </div>
  );
});

export default TrackLines;