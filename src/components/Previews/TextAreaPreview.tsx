import { Textarea } from "@material-tailwind/react";

type TextAreaPreviewType = {
  label: string;
  value: string;
  SetInputValueCB: (value: string) => void;
};

export default function TextAreaPreview(props: TextAreaPreviewType) {
  return (
    <Textarea
      value={props.value}
      onChange={(e) => {
        props.SetInputValueCB(e.target.value);
      }}
      variant="standard"
      label={props.label}
    />
  );
}
