import { metalList } from "@/data/metalList";
import React, { useEffect, useState } from "react";
import { useApp } from "@/context/appContext";

function MetalSelectDropDown({
  selectedMetal,
  setSelectedMetal,
}: {
  selectedMetal: number;
  setSelectedMetal: (val: number) => void;
}) {
  const { dropDownMetalList, setDropDownMetalList } = useApp();
  const [prevSelectedMetal, setPrevSelectedMetal] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (selectedMetal === 0) return;

    setDropDownMetalList((prev) =>
      prev.map((metal) => {
        // Re-enable the previously selected option
        if (metal.id === prevSelectedMetal) {
          return { ...metal, disabled: false };
        }

        // Disable the currently selected option
        if (metal.id === selectedMetal) {
          return { ...metal, disabled: true };
        }

        return metal;
      })
    );

    // Update the previous selected state
    setPrevSelectedMetal(selectedMetal);
  }, [selectedMetal]);

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
      <option key={0} value="none">
        None
      </option>
      {dropDownMetalList.map((item) => (
        <option key={item.id} value={item.id} disabled={item.disabled}>
          {item.name}
        </option>
      ))}
    </select>
  );
}

export default MetalSelectDropDown;
