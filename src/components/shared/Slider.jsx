"use client";
import { useState } from "react";

export default function Slider({
  handleOnChange,
  value,
  min,
  max,
  step,
  ariaLabel,
}) {
  return (
    <div className="w-full max-w-xs mx-auto">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleOnChange}
        step={step}
        aria-labelledby={ariaLabel}
        className="slider appearance-none w-full h-4 rounded-lg bg-gray-300 outline-none focus:outline-none active:bg-gray-600"
      />
      <div className="text-center mt-2">{value}</div>
    </div>
  );
}
