import { useState } from "react";
import styles from "./TableFilters.module.css";

type Field = {
  key: string;
  label: string;
  type: "text" | "select";
  options?: { value: string; label: string }[];
};

type Props = {
  fields: Field[];
  onApply: (filters: Record<string, string>) => void;
};

export default function TableFilters({ fields, onApply }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});

  function handleChange(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className={styles.filters}>
      {fields.map((field) => {
        if (field.type === "select") {
          return (
            <select
              key={field.key}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className={styles.select}
            >
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          );
        }

        return (
          <input
            key={field.key}
            type="text"
            placeholder={field.label}
            className={styles.input}
            onChange={(e) => handleChange(field.key, e.target.value)}
          />
        );
      })}

      <button className={styles.button} onClick={() => onApply(values)}>
        Apply
      </button>
    </div>
  );
}
