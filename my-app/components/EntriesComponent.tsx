import React from "react";
import { MetalEntry } from "@/Type/Type";
import { metalName } from "@/functions/helpFunction";
type EntriesComponentProps = {
  item: MetalEntry;
  removeEntry: (id: number) => void;
};
function EntriesComponent({ item, removeEntry }: EntriesComponentProps) {
  return (
    <div className="flex items-center w-full">
      <div className="bg-slate-300 p-4 rounded-lg flex flex-col gap-2  m-2">
        <p className="text-xl font-bold text-start">
          {metalName(item.selectedMetal)}
        </p>
        <div className="flex justify-between p-5 gap-15">
          <div>
            {" "}
            <p className="underline font-bold">Removed Metal BreakDown:</p>
            <div>
              <p>
                Small Bag:{" "}
                <span>
                  {item.smallBag} Quant | {item.smallBagWg} KG
                </span>
              </p>
              <p>
                Jumbo Bag:{" "}
                <span>
                  {item.jumboBag} Quant | {item.jumboBagWg} KG
                </span>
              </p>
              <p>
                Waste: <span>{item.wastage}</span>
              </p>
              {/* <p>Total Wastage: {item.totalWastage}</p> */}
              <p>Other Metal: {item.otherMetalsWg}</p>
            </div>
          </div>
          <div className="text-xl font-bold ">
            <p>Total WG: {item.actualWeight}</p>
            <p>Waste WG: {item.totalWastage}</p>
            <p>Metal WG: {item.metalWeight}</p>
          </div>
        </div>
      </div>
      <button onClick={() => removeEntry(item.id)} className="text-red-600">
        Delete
      </button>
    </div>
  );
}

export default EntriesComponent;
