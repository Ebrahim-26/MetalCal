import { customFieldType } from "@/Type/Type";

function CustomField({ setValue, value, label }: customFieldType) {
  return (
    <div className="flex border items-center rounded-sm">
      <div className="border-r">
        <input
          type="number"
          style={{ minWidth: 100 }}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="p-2 outline-none"
        />
      </div>
      <p className="px-2">{label}</p>
    </div>
  );
}

export default CustomField;
