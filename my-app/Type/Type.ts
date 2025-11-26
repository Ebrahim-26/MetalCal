export type metalListData = {
  id: number;
  name: string;
  code: string;
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
