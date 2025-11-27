"use client";
import { useEffect, useState } from "react";
import CustomField from "./customField";
import MetalSelectDropDown from "./MetalSelectDropDown";
import { MetalEntry } from "@/Type/Type";
import EntriesComponent from "./EntriesComponent";
import { useApp } from "@/context/appContext";
function MetalEntryField() {
  const { entries, setEntries } = useApp();
  const emptyEntry = {
    id: Date.now(),
    selectedMetal: 0,
    weight: 0,
    smallBag: 0,
    jumboBag: 0,
    wastage: 0,
    otherMetalsWg: 0,
    totalWastage: 0,
  };
  const [entry, setEntry] = useState<any>(emptyEntry);
  const addEntry = () => {
    setEntries((prev) => [...prev, entry]);
    setEntry({ ...emptyEntry, id: Date.now() });
  };

  useEffect(() => {
    const smallBagWg = Math.floor(entry.smallBag / 5);
    const jumboBagWg = entry.jumboBag * 3;
    const waste = smallBagWg + jumboBagWg + entry.wastage + entry.otherMetalsWg;
    const netWeight = entry.weight - waste;
    setEntry((prev: MetalEntry) => ({
      ...prev,
      totalWastage: waste,
      smallBagWg,
      jumboBagWg,
      netWeight,
    }));
  }, [
    entry.smallBag,
    entry.jumboBag,
    entry.wastage,
    entry.otherMetalsWg,
    entry.weight,
  ]);

  const grandWeight = entries.reduce((total, item) => total + item.weight, 0);
  const grandWastage = entries.reduce(
    (total, item) => total + item.totalWastage,
    0
  );
  const netMetal = entries.reduce((total, item) => total + item.netWeight, 0);

  const removeEntry = (id: number) => {
    setEntries((prev) => prev.filter((r) => r.id != id));
  };
  console.log(entries, "|| Entries");
  console.log("Entry", entry);
  console.log("Grand Weight", grandWeight);
  return (
    <>
      <div className="flex gap-2">
        <MetalSelectDropDown
          selectedMetal={entry.selectedMetal}
          setSelectedMetal={(val: number) =>
            setEntry((prev: any) => ({ ...prev, selectedMetal: val }))
          }
        />
        <CustomField
          label="WG"
          value={entry.weight}
          setValue={(val) =>
            setEntry((prev: any) => ({ ...prev, weight: val }))
          }
        />
        <CustomField
          label="SB"
          value={entry.smallBag}
          setValue={(val) =>
            setEntry((prev: any) => ({ ...prev, smallBag: val }))
          }
        />
        <CustomField
          label="JB"
          value={entry.jumboBag}
          setValue={(val) =>
            setEntry((prev: any) => ({ ...prev, jumboBag: val }))
          }
        />
        <CustomField
          label="waste"
          value={entry.wastage}
          setValue={(val) =>
            setEntry((prev: any) => ({ ...prev, wastage: val }))
          }
        />
        <CustomField
          label="OM"
          value={entry.otherMetalsWg}
          setValue={(val) =>
            setEntry((prev: any) => ({ ...prev, otherMetalsWg: val }))
          }
        />
        <button onClick={addEntry}>save</button>
      </div>
      <div>
        {entries.map((item) => (
          <EntriesComponent
            item={item}
            key={item.id}
            removeEntry={removeEntry}
          />
        ))}
        <p>Grand WG: {grandWeight}</p>
        <p>Grand Wastage: {grandWastage}</p>
        <p>Net Metal: {netMetal}</p>
        <p>Balance: {grandWeight - grandWastage - netMetal}</p>
      </div>
    </>
  );
}

export default MetalEntryField;
