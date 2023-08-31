import React from "react";
import { LabelledInputType } from "../types";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function LabelledInput(props: LabelledInputType) {
  return (
    <div key={props.id} className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-1">
        Field Name
      </label>
      <div className="flex items-center">
        <input
          className="flex-1 border border-gray-300 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
          type={"text"}
          value={props.label}
          onChange={(e) => props.labelHandlerCB(props.id, e.target.value)}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id={`select-label-${props.id}`}>Type</InputLabel>
          <Select
            labelId={`select-label-${props.id}`}
            id={`select-${props.id}`}
            value={props.type}
            label="Type"
            onChange={(e: SelectChangeEvent) =>
              props.typeHandlerCB(props.id, e.target.value)
            }
          >
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="password">Password</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="tel">Tel</MenuItem>
            <MenuItem value="file">File</MenuItem>
          </Select>
        </FormControl>
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded-lg focus:outline-none focus:shadow-outline-red active:bg-red-500"
          onClick={() => props.removeFieldCB(props.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
