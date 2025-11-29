"use client";
import { useEffect, useState } from "react";
import CustomField from "./customField";
import MetalSelectDropDown from "./MetalSelectDropDown";
import { MetalEntry, OtherMetals } from "@/Type/Type";
import EntriesComponent from "./EntriesComponent";
import { useApp } from "@/context/appContext";
import Accordion from "./Accordion";
import AccordionUsage from "./Accordion";
function MetalEntryField() {
  const { entries, setEntries } = useApp();
  const emptyEntry = {
    id: Date.now(),
    selectedMetal: 0, //selected from DD
    weight: 0, //entered metal Weight
    actualWeight: 0, //weight after reduing other metal weight
    smallBag: 0,
    jumboBag: 0,
    wastage: 0,
    smallBagWg: 0, // smallBag/5
    jumboBagWg: 0, // JB*3
    totalWastage: 0, // this includes SM, JB and wastage
    metalWeight: 0, // Weight of the metal after detucting totalWastage
    otherMetals: [],
    otherMetalsWg: 0,
  };
  const [entry, setEntry] = useState<any>(emptyEntry); //individual entry

  const addEntry = () => {
    if (entry.selectedMetal != 0) {
      setEntries((prev) => [...prev, entry]);
      setEntry({ ...emptyEntry, id: Date.now() });
    }
  };

  const removeEntry = (id: number) => {
    setEntries((prev) => prev.filter((r) => r.id != id));
  };

  const addOtherMetal = () => {
    setEntry((prev: MetalEntry) => ({
      ...prev,
      otherMetals: [
        ...prev.otherMetals,
        {
          id: Date.now(),
          selectedMetal: 0,
          weight: 0,
        },
      ],
    }));
  };

  //calculates SM,JB,waste and net weigth and adds tot
  useEffect(() => {
    const smallBagWg = Math.floor(entry.smallBag / 5);
    const jumboBagWg = entry.jumboBag * 3;
    const otherMetalWeight = entry.otherMetals.reduce(
      (total: number, item: OtherMetals) => total + item.weight,
      0
    );
    const waste = smallBagWg + jumboBagWg + entry.wastage;
    const metalWeight = entry.weight - waste - otherMetalWeight;
    const actualWeight = entry.weight - otherMetalWeight;
    setEntry((prev: MetalEntry) => ({
      ...prev,
      totalWastage: waste,
      actualWeight,
      smallBagWg,
      jumboBagWg,
      metalWeight,
      otherMetalsWg: otherMetalWeight,
    }));
  }, [
    entry.smallBag,
    entry.jumboBag,
    entry.wastage,
    entry.otherMetalsWg,
    entry.weight,
    entry.otherMetals,
  ]);

  const grandWeight = entries.reduce(
    (total, item) => total + item.actualWeight,
    0
  );
  const grandWastage = entries.reduce(
    (total, item) => total + item.totalWastage,
    0
  );
  const netMetal = entries.reduce((total, item) => total + item.metalWeight, 0);

  console.log("|| EntriesLIST", entries);
  console.log("Entry", entry);

  const removeOtherMetals = (id: number) => {
    const removedOtherMetals = entry.otherMetals.filter(
      (r: OtherMetals) => r.id !== id
    );
    setEntry((prev: MetalEntry) => ({
      ...prev,
      otherMetals: removedOtherMetals,
    }));
  };
  return (
    <div>
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
        <button onClick={addEntry}>save</button>
      </div>
      <div className="flex gap-5 ">
        <button
          onClick={addOtherMetal}
          className="bg-violet-300 hover:bg-violet-400 p-5 h-5 flex items-center my-5 rounded-2xl"
        >
          Add other metal
        </button>
        <div>
          {entry.otherMetals.map((om: OtherMetals) => (
            <div key={om.id} className="flex gap-5 items-center m-5">
              <CustomField
                label="Metal WG"
                value={om.weight}
                setValue={(val) =>
                  setEntry((prev: MetalEntry) => ({
                    ...prev,
                    otherMetals: prev.otherMetals.map((m) =>
                      m.id === om.id ? { ...m, weight: val } : m
                    ),
                  }))
                }
              />

              <MetalSelectDropDown
                selectedMetal={om.selectedMetal}
                setSelectedMetal={(val) =>
                  setEntry((prev: MetalEntry) => ({
                    ...prev,
                    otherMetals: prev.otherMetals.map((m) =>
                      m.id === om.id ? { ...m, selectedMetal: val } : m
                    ),
                  }))
                }
              />
              <button
                className="text-red-600 font-bold"
                onClick={() => removeOtherMetals(om.id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      {entries.map((item) => (
        <AccordionUsage item={item} key={item.id} removeEntry={removeEntry} />
      ))}

      <div className="flex gap-5 justify-center m-5">
        <p className="bg-slate-400 p-3 rounded-2xl font-bold">
          Grand WG: {grandWeight}
        </p>
        <p className="bg-slate-400 p-3 rounded-2xl font-bold">
          Grand Wastage: {grandWastage}
        </p>
        <p className="bg-slate-400 p-3 rounded-2xl font-bold">
          Net Metal: {netMetal}
        </p>
        <p className="bg-slate-400 p-3 rounded-2xl font-bold">
          Balance: {grandWeight - grandWastage - netMetal}
        </p>
      </div>
    </div>
  );
}

export default MetalEntryField;
