"use client";
import { useEffect, useState } from "react";
import CustomField from "./customField";
import { metalList } from "@/data/metalList";
import { v4 as uuidv4 } from "uuid";
import { metalName } from "@/functions/helpFunction";

function MetalEntryField() {
  const tempData = [
    {
      id: 1,
      selectedMetal: 1,
      weight: 123,
      sb_quantity: 0,
      sb_weight: 1,
      jb_quantity: 0,
      jb_weight: 2,
      wastage: 0,
      totalWastage: 5,
      netTotal: 10,
      otherMetal: [{ id: 21, selectedMetal: 1, weight: 23 }],
    },
  ];

  // MAIN ENTRY STATE
  const [data, setData] = useState(tempData);

  const [weight, setWeight] = useState(0);
  const [sb, setSb] = useState(0);
  const [jb, setJb] = useState(0);
  const [wastage, setWastage] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const [totalWaste, setTotalWaste] = useState(0);

  const [selectedMetal, setSelectedMetal] = useState(metalList[0]?.id ?? 0);

  // OTHER METALS ARRAY
  const [otherMetal, setOtherMetal] = useState<
    { id: string; selectedMetal: number; weight: number }[]
  >([]);

  const payload = {
    id: uuidv4(),
    selectedMetal,
    weight,
    sb_quantity: sb,
    sb_weight: Math.floor(sb / 5),
    jb_quantity: jb,
    jb_weight: jb * 3,
    wastage,
    total_wastage: Math.floor(sb / 5) + jb * 3 + wastage,
    netTotal,
    otherMetal,
  };

  // CALCULATIONS
  useEffect(() => {
    const smallBag = Math.floor(sb / 5);
    const jumboBag = jb * 3;
    const calc = weight - jumboBag - (smallBag - wastage);

    setNetTotal(calc);
    setTotalWaste(jumboBag + wastage + smallBag);
  }, [weight, sb, jb, wastage]);

  function addEntry() {
    setData((prev) => [...prev, payload]);
    setWeight(0);
    setSb(0);
    setJb(0);
    setWastage(0);
    setSelectedMetal(metalList[0]?.id ?? 0);
    setOtherMetal([]);
  }

  const addOtherMetal = () => {
    setOtherMetal((prev) => [
      ...prev,
      {
        id: uuidv4(),
        selectedMetal: metalList[0]?.id ?? 0,
        weight: 0,
      },
    ]);
  };

  //   const saveOtherMetal = () => {};
  return (
    <>
      {/* MAIN ENTRY */}
      <div className="flex gap-2 mt-4">
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

        <CustomField label="WG" value={weight} setValue={setWeight} />
        <CustomField label="SB" value={sb} setValue={setSb} />
        <CustomField label="JB" value={jb} setValue={setJb} />
        <CustomField label="Wastage" value={wastage} setValue={setWastage} />
      </div>

      {/* OTHER METALS SECTION */}
      {otherMetal.map((item) => (
        <div key={item.id} className="flex gap-3 mt-2">
          <select
            style={{
              border: "1px solid",
              padding: 2,
              borderRadius: 5,
            }}
            value={item.selectedMetal}
            onChange={(e) =>
              setOtherMetal((prev) =>
                prev.map((m) =>
                  m.id === item.id
                    ? { ...m, selectedMetal: Number(e.target.value) }
                    : m
                )
              )
            }
          >
            {metalList.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>

          <CustomField
            label="Weight"
            value={item.weight}
            setValue={(val) =>
              setOtherMetal((prev) =>
                prev.map((m) => (m.id === item.id ? { ...m, weight: val } : m))
              )
            }
          />
        </div>
      ))}

      <button onClick={addOtherMetal} className="mt-2 p-1 bg-gray-200 rounded">
        Add other metal
      </button>

      <button onClick={addEntry} className="bg-blue-200 rounded-xl p-2 mt-3">
        Save
      </button>

      {/* DISPLAY SECTION */}
      <div className="mt-6">
        {data.map((item) => (
          <div key={item.id} className="flex gap-2">
            <p>Name: {metalName(item.selectedMetal)}</p>
            <p>Weight: {item.weight}</p>
            <p>SB: {item.sb_weight}</p>
            <p>JB: {item.jb_weight}</p>
            <p>Wastage: {item.wastage}</p>
            {item?.otherMetal && (
              <>
                <div>
                  Other Metal:
                  {item.otherMetal.map((metal) => (
                    <div key={metal.id}>
                      <p>Metal Name:{metalName(metal.selectedMetal)}</p>
                      <p>Metal Weight:{metal.weight}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 text-xl">
        Selected Metal: {metalName(selectedMetal)}
      </div>
      <div className="mt-2 text-xl">Total: {netTotal}</div>
      <div className="mt-2 text-xl">Total Waste: {totalWaste}</div>
    </>
  );
}

export default MetalEntryField;
