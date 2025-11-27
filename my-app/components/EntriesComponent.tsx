import React from "react";
import { MetalEntry } from "@/Type/Type";
import { metalName } from "@/functions/helpFunction";
type EntriesComponentProps = {
  item: MetalEntry;
  removeEntry: (id: number) => void;
};
function EntriesComponent({ item, removeEntry }: EntriesComponentProps) {
  return (
    <div className="flex items-center">
      <div className="bg-slate-300 p-4 rounded-lg flex gap-2 items-center m-2">
        <p className="text-md font-bold">{metalName(item?.selectedMetal)}</p>
        <p className="text-md font-bold bg-green-200 rounded-xl p-2">
          Weight: {item.actualWeight}
        </p>
        <div className="flex flex-col gap-2">
          <p className="text-md font-bold bg-amber-200 rounded-xl p-2">
            Small Bag Quantity/5: {item.smallBag}
          </p>
          <p className="text-md font-bold bg-amber-200 rounded-xl p-2">
            Small Bag WG: {item.smallBagWg}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-md font-bold bg-amber-300 rounded-xl p-2">
            Jumbo Bag Quantity*3: {item.jumboBag}
          </p>
          <p className="text-md font-bold bg-amber-300 rounded-xl p-2">
            Jumbo Bag WG: {item.jumboBagWg}
          </p>
        </div>
        <p className="text-md font-bold bg-red-200 rounded-xl p-2">
          Waste: {item.wastage}
        </p>
        <div className="flex flex-col items-center border-2 p-4 border-red-400">
          <p className="text-xl font-bold">METAL WEIGHT</p>
          <p className="text-xl font-bold text-red-500">{item.metalWeight}</p>
        </div>
      </div>
      <button onClick={() => removeEntry(item.id)} className="text-red-600">
        Delete
      </button>
    </div>
  );
}

export default EntriesComponent;
