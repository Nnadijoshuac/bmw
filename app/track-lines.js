export default function TrackLines({ className = "" }) {
  return (
    <div className={`trackLines ${className}`.trim()} aria-hidden="true">
      <div className="trackLinesMain" />
      <div className="trackLinesDepth" />
    </div>
  );
}