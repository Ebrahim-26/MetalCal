import { metalList } from "../data/metalList.js";

const getAllMetalList = (req, res) => {
  return res.status(200).json(metalList);
};

const getMetalbyId = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const singleMetal = metalList.filter((i) => i.id === id);
  console.log("Single Metal:", singleMetal.length);
  if (singleMetal == 0) {
    return res.status(404).json({ error: `No ${id} ID exists` });
  }
  res.json(singleMetal);
};

const createMetal = (req, res) => {
  console.log(req.body);
  const newMetal = {
    id: metalList.length + 1,
    name: req.body.name,
    code: req.body.code,
  };

  if (!newMetal.name) {
    return res.status(400).json({ error: "Metal name is missing." });
  }

  if (!newMetal.code) {
    return res.status(400).json({ error: "Metal Code is missing." });
  }

  metalList.push(newMetal);
  res.status(201).json(newMetal);
};

const deleteMetal = (req, res) => {
  console.log("Delete Metal controller");
  const id = parseInt(req.params.id, 10);
  const index = metalList.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Metal not found" });
  }
  metalList.splice(index, 1);
  return res
    .status(200)
    .json({ message: "Metal deleted successfully", metalList });
};

const updateMetal = (req, res) => {
  console.log("Update");
  const id = parseInt(req.params.id);
  const metal = metalList.find((item) => item.id === id);
  console.log(metal);
  if (!metal) {
    return res.status(400).json({ error: "No ID exists" });
  }
  if (req.body.name) {
    metal.name = req.body.name;
  }
  if (req.body.code) {
    metal.code = req.body.code;
  }
  res.status(200).json(metal);
};
export { getAllMetalList, getMetalbyId, createMetal, deleteMetal, updateMetal };
