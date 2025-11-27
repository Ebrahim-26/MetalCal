import { metalList } from "@/data/metalList";
import React from "react";

function MetalSelectDropDown({
  selectedMetal,
  setSelectedMetal,
}: {
  selectedMetal: number;
  setSelectedMetal: (val: number) => void;
}) {
  return (
    <select
      style={{
        border: "1px solid",
        padding: 2,
        borderRadius: 5,
      }}
      value={selectedMetal}
      onChange={(e) => setSelectedMetal(Number(e.target.value))}
    >
      {metalList.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
}

export default MetalSelectDropDown;
