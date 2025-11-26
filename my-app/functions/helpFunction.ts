import { metalList } from "@/data/metalList";

export const metalName = (id: number) => {
  const metalName = metalList.find((e) => e.id == id);
  return metalName?.name;
};
