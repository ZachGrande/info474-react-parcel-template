function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function YearSlider({
  value,
  min,
  max,
  step = 1,
  onChange,
  ticks = [],
  ariaLabel = "Select year",
  disabled = false,
  className = ""
}) {
  const hasValidRange = Number.isFinite(min) && Number.isFinite(max) && max >= min;
  const safeMin = hasValidRange ? min : 0;
  const safeMax = hasValidRange ? max : 0;
  const safeValue = clamp(Number(value) || safeMin, safeMin, safeMax);

  const handleChange = (event) => {
    const nextValue = Number(event.target.value);
    onChange(clamp(nextValue, safeMin, safeMax));
  };

  return (
    <div className={`w-100 py-1 ${className}`.trim()}>
      <input
        className="form-range"
        type="range"
        min={safeMin}
        max={safeMax}
        step={step}
        value={safeValue}
        disabled={disabled || !hasValidRange}
        aria-label={ariaLabel}
        aria-valuemin={safeMin}
        aria-valuemax={safeMax}
        aria-valuenow={safeValue}
        onChange={handleChange}
      />
      {ticks.length > 0 && (
        <div className="d-flex justify-content-between text-muted small px-1" aria-hidden="true">
          {ticks.map(({ value: tickValue, label }) => (
            <span key={`${tickValue}-${label}`}>
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default YearSlider;
