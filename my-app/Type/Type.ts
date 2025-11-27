export type metalListData = {
  id: number;
  name: string;
  code: string;
  disabled: boolean;
};

export type customFieldType = {
  label: string;
  setValue: (val: number) => void;
  value: number;
};

export type selectMetalType = {
  setValue: (val: string) => void;
  value: string;
};

export type metalDataType = {
  id: number;
  selectedMetal: number;
  weight: number;
  sb: number;
  jb: number;
  wastage: number;
  otherMetals?: [id: number, weight: number];
};

export type MetalEntry = {
  id: number;
  selectedMetal: number;
  weight: number;
  actualWeight: number;
  smallBag: number;
  smallBagWg: number;
  jumboBag: number;
  jumboBagWg: number;
  wastage: number;
  totalWastage: number;
  metalWeight: number;
  otherMetals: OtherMetals[];
};

export type OtherMetals = {
  id: number;
  selectedMetal: number;
  weight: number;
};
