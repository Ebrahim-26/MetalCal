import { customFieldType } from "@/Type/Type";

function CustomField({ setValue, value, label }: customFieldType) {
  return (
    <div className="flex items-center border-2 rounded-sm">
      <input
        type="number"
        style={{ width: "100%" }}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="p-2 outline-none"
      />
    </div>
  );
}

export default CustomField;
