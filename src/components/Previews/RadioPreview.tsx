import React from "react";
import { Radio } from "@material-tailwind/react";

type RadioPreviewProps = {
  options: string[];
  value: string;
  SetRadioValCB: (value: string) => void;
};

export default function RadioPreview(props: RadioPreviewProps) {
  return (
    <div className="w-full border rounded-md">
      {props.options.map((opt) => (
        <div key={opt} className="flex items-center p-2 border-b">
          <Radio
            defaultChecked={opt === props.value}
            crossOrigin={""}
            name="type"
            label={opt}
            value={opt}
            onChange={(e) => {
              props.SetRadioValCB(e.target.value);
            }}
          />
        </div>
      ))}
    </div>
  );
}
