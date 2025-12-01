"use client";
import { useEffect, useState } from "react";
import CustomField from "./customField";
import MetalSelectDropDown from "./MetalSelectDropDown";
import { MetalEntry, OtherMetals } from "@/Type/Type";
import EntriesComponent from "./EntriesComponent";
import { useApp } from "@/context/appContext";
import Accordion from "./Accordion";
import AccordionUsage from "./Accordion";
import SummaryField from "./SummaryField";
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
    if (entry.selectedMetal === 0) return;

    const timestamp = Date.now();
    const mainEntry: MetalEntry = { ...entry, id: timestamp };

    const otherMetalEntries: MetalEntry[] = entry.otherMetals
      .filter(
        (metal: OtherMetals) => metal.selectedMetal !== 0 && metal.weight > 0
      )
      .map((metal: OtherMetals, index: number) => ({
        id: timestamp + index + 1,
        selectedMetal: metal.selectedMetal,
        weight: metal.weight,
        actualWeight: metal.weight,
        smallBag: 0,
        smallBagWg: 0,
        jumboBag: 0,
        jumboBagWg: 0,
        wastage: 0,
        totalWastage: 0,
        metalWeight: metal.weight,
        otherMetals: [],
        otherMetalsWg: 0,
      }));

    // setEntries((prev) => [...prev, mainEntry, ...otherMetalEntries]);
    setEntries((prev) => [...prev, mainEntry]);
    setEntry({ ...emptyEntry, id: Date.now() });
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
    (total, item) => total + (item.actualWeight || 0),
    0
  );
  const grandWastage = entries.reduce(
    (total, item) => total + (item.totalWastage || 0),
    0
  );
  const netMetal = entries.reduce(
    (total, item) => total + (item.metalWeight || 0),
    0
  );

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
    <div className="w-full flex flex-col items-center gap-5">
      <div className="bg-gray-200 rounded-2xl flex flex-col p-5 w-[60%] border-l-4 border-blue-950 shadow-lg">
        <div className="grid grid-cols-2 gap-2">
          <div className="h-full flex flex-col gap-2">
            <p className="font-bold">Select Metal</p>
            <MetalSelectDropDown
              selectedMetal={entry.selectedMetal}
              setSelectedMetal={(val: number) =>
                setEntry((prev: any) => ({ ...prev, selectedMetal: val }))
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Enter Metal Weight</p>
            <CustomField
              label="WG"
              value={entry.weight}
              setValue={(val) =>
                setEntry((prev: any) => ({ ...prev, weight: val }))
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Enter Small Bag Quantity</p>

            <CustomField
              label="SB"
              value={entry.smallBag}
              setValue={(val) =>
                setEntry((prev: any) => ({ ...prev, smallBag: val }))
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Enter Jumbo Bag Quantity</p>

            <CustomField
              label="JB"
              value={entry.jumboBag}
              setValue={(val) =>
                setEntry((prev: any) => ({ ...prev, jumboBag: val }))
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Enter Waste in KGs</p>

            <CustomField
              label="waste"
              value={entry.wastage}
              setValue={(val) =>
                setEntry((prev: any) => ({ ...prev, wastage: val }))
              }
            />
          </div>
        </div>
        <div className="flex gap-5 ">
          <button
            onClick={addOtherMetal}
            className="bg-white font-bold cursor-pointer hover:bg-zinc-400 p-5 h-5 flex items-center my-5 rounded-md text-nowrap"
          >
            + Other Metal
          </button>
          <div className="w-full flex flex-col items-center">
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
                  className="text-red-600 font-bold bg-red-300 hover:bg-red-200 rounded-full px-3 py-1 cursor-pointer"
                  onClick={() => removeOtherMetals(om.id)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={addEntry}
          className="cursor-pointer bg-white p-2 rounded-md font-bold"
        >
          save
        </button>
      </div>
      <div className="w-[60%]">
        {entries.map((item) => (
          <AccordionUsage item={item} key={item.id} removeEntry={removeEntry} />
        ))}
      </div>

      <SummaryField
        grandWastage={grandWastage}
        grandWeight={grandWeight}
        netMetal={netMetal}
      />
      <button
        className="bg-red-400 hover:bg-red-500 text-white p-3 rounded-2xl font-bold"
        onClick={() => {
          setEntries([]);
          setEntry({ ...emptyEntry, id: Date.now() });
        }}
      >
        CLEAR
      </button>
    </div>
  );
}

export default MetalEntryField;
