import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { EntriesComponentProps } from "@/Type/Type";
import { metalName } from "@/functions/helpFunction";

export default function AccordionUsage({
  item,
  removeEntry,
}: EntriesComponentProps) {
  return (
    <div className="mt-2">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="flex justify-between gap-10 w-full">
            <p className="text-xl font-bold flex items-center">
              {metalName(item.selectedMetal)}
            </p>
            <div className="font-bold flex gap-2">
              <div className="flex flex-col justify-end">
                <p>Total WG: </p>
                <p>Waste WG:</p>
                <p>Metal WG:</p>
              </div>
              <div>
                <p>{item.actualWeight}</p>
                <p>{item.totalWastage}</p>
                <p>{item.metalWeight}</p>
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <p className="underline font-bold">Removed Weight BreakDown:</p>
          <div>
            <p>
              Small Bag:{" "}
              <span className="font-bold">
                {item.smallBag} Quant | {item.smallBagWg} KG
              </span>
            </p>
            <p>
              Jumbo Bag:{" "}
              <span className="font-bold">
                {item.jumboBag} Quant | {item.jumboBagWg} KG
              </span>
            </p>
            <p>
              Waste: <span className="font-bold">{item.wastage}</span>
            </p>
            {/* <p>Total Wastage: {item.totalWastage}</p> */}
            <p>
              Other Metal:{" "}
              <span className="font-bold">{item.otherMetalsWg}</span>
            </p>
          </div>
        </AccordionDetails>
        <AccordionActions>
          <Button>Edit</Button>
          <Button onClick={() => removeEntry(item.id)}>Delete</Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
