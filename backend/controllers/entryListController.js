import { entryList } from "../data/data.js";
// import { PrismaClient } from '../generated/prisma/client.js'
// const prisma = new PrismaClient();
// import { prisma } from "../lib/prisma.js";
export const getAllEntry = (req, res) => {
  return res.status(200).json(entryList);
};

export const getSingleEntry = (req, res) => {
  const id = Number(req.params.id);
  const entry = entryList.find((item) => item.id === id);
  if (!entry) {
    return res.status(404).json({ error: "No ID found." });
  }
  return res.status(200).json(entry);
};

export const createEntry = async (req, res) => {
  const {
    weight,
    jumboBag,
    smallBag,
    selectedMetal,
    wastage,
    otherMetals = [],
  } = req.body;

  // Validation
  const safeWeight = Number(weight);
  if (Number.isNaN(safeWeight)) {
    return res.status(400).json({ error: "Invalid weight" });
  }

  const safeJumboBag = Number(jumboBag ?? 0);
  const safeSmallBag = Number(smallBag ?? 0);
  const safeWastage = Number(wastage ?? 0);

  // Calculations
  const jumboBagWg = safeJumboBag * 3;
  const smallBagWg = Math.floor(safeSmallBag / 5);

  const otherMetalsWg = otherMetals.reduce(
    (sum, m) => sum + Number(m.weight || 0),
    0
  );

  const totalWastage = jumboBagWg + smallBagWg + safeWastage;
  const actualWeight = safeWeight - otherMetalsWg;
  const metalWeight = safeWeight - totalWastage - otherMetalsWg;

  if (metalWeight < 0) {
    return res.status(400).json({
      error: "Calculated metal weight cannot be negative",
    });
  }

  try {
    // Create entry in database with nested otherMetals
    const newEntry = await prisma.entry.create({
      data: {
        weight: safeWeight,
        actualWeight,
        jumboBag: safeJumboBag,
        jumboBagWg,
        smallBag: safeSmallBag,
        smallBagWg,
        selectedMetal,
        metalWeight,
        otherMetalsWg,
        wastage: safeWastage,
        totalWastage,
        // Create related OtherMetal records
        otherMetals: {
          create: otherMetals.map((metal) => ({
            selectedMetal: Number(metal.selectedMetal || 0),
            weight: Number(metal.weight || 0),
          })),
        },
      },
      // Include the created otherMetals in the response
      include: {
        otherMetals: true,
      },
    });

    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to create entry" });
  }
};

export const deleteEntry = (req, res) => {
  const id = Number(req.params.id);

  const index = entryList.findIndex((e) => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "No Id found" });
  }

  entryList.splice(index, 1);
  res.status(200).json(entryList);
};

// export const createEntry = (req, res) => {
//   const {
//     weight,
//     jumboBag,
//     smallBag,
//     selectedMetal,
//     wastage,
//     otherMetals = [],
//   } = req.body;

//   const safeWeight = Number(weight);
//   if (Number.isNaN(safeWeight)) {
//     return res.status(400).json({ error: "Invalid weight" });
//   }

//   const safeJumboBag = Number(jumboBag ?? 0);
//   const safeSmallBag = Number(smallBag ?? 0);
//   const safeWastage = Number(wastage ?? 0);

//   const jumboBagWg = safeJumboBag * 3;
//   const smallBagWg = Math.floor(safeSmallBag / 5);

//   const otherMetalsWg = otherMetals.reduce(
//     (sum, m) => sum + Number(m.weight || 0),
//     0
//   );

//   const totalWastage = jumboBagWg + smallBagWg + safeWastage;

//   const actualWeight = safeWeight - otherMetalsWg;
//   const metalWeight = safeWeight - totalWastage - otherMetalsWg;

//   if (metalWeight < 0) {
//     return res.status(400).json({
//       error: "Calculated metal weight cannot be negative",
//     });
//   }

//   const newEntry = {
//     id: entryList.length + 1,
//     weight: safeWeight,
//     actualWeight,
//     jumboBag: safeJumboBag,
//     jumboBagWg,
//     smallBag: safeSmallBag,
//     smallBagWg,
//     selectedMetal,
//     metalWeight,
//     otherMetals,
//     otherMetalsWg,
//     wastage: safeWastage,
//     totalWastage,
//   };

//   entryList.push(newEntry);
//   res.status(201).json(newEntry);
// };

export const deleteAllEntries = (req, res) => {
  entryList.length = 0;
  return res.status(200).json({ success: true });
};
