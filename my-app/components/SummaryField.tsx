import React from "react";
type summaryType = {
  grandWeight: number;
  grandWastage: number;
  netMetal: number;
};

function DisplayCard({ val }: { val: number }) {
  return (
    <div className="font-bold text-2xl flex items-center justify-center w-full bg-zinc-400/70  rounded-sm p-5">
      <div>{val || 0}</div>
    </div>
  );
}

function SummaryField({ grandWastage, grandWeight, netMetal }: summaryType) {
  const safeGrandWeight = grandWeight || 0;
  const safeGrandWastage = grandWastage || 0;
  const safeNetMetal = netMetal || 0;
  const balance = safeGrandWeight - safeGrandWastage - safeNetMetal;

  return (
    <div className="h-full  flex flex-col items-center w-[60%]">
      <p className="font-bold m-2 text-black ">SUMMARY</p>
      <div className="bg-blue-950 rounded-2xl w-full shadow-2xl ">
        <div className="flex gap-5 justify-evenly m-5">
          <div className="w-full">
            <p className="text-white font-bold text-center">Grand Weight</p>
            <DisplayCard val={safeGrandWeight} />
          </div>
          <div className="w-full">
            <p className="text-white font-bold text-center">Grand Wastage</p>
            <DisplayCard val={safeGrandWastage} />
          </div>
          <div className="w-full">
            <p className="text-white font-bold text-center">Net Weight</p>
            <DisplayCard val={safeNetMetal} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryField;
