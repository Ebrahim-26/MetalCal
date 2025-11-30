import React from "react";
type summaryType = {
  grandWeight: number;
  grandWastage: number;
  netMetal: number;
};

function DisplayCard({ val }: { val: number }) {
  return (
    <div className="font-bold text-2xl flex items-center justify-center w-full bg-zinc-400 rounded-sm h-12">
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
    <div className="w-full h-full  flex flex-col items-center">
      <div className="bg-blue-950 rounded-2xl w-[60%] ">
        <p className="font-bold m-2 text-white ">SUMMARY</p>
        <div className="flex gap-5 justify-center m-5">
          <div >
            <p className="text-white font-bold">Grand Weight</p>
            <DisplayCard val={safeGrandWeight} />
          </div>
          <div >
            <p className="text-white font-bold">Grand Wastage</p>
            <DisplayCard val={safeGrandWastage} />
          </div>
          <div >
            <p className="text-white font-bold">Net Weight</p>
            <DisplayCard val={safeNetMetal} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryField;
