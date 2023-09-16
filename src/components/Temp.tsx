// import React, { useState, useEffect } from "react";
// import { MultiSelectInputType } from "../../types/types";
// import { fieldOption } from "../../types/formReducerTypes";
// import { clear } from "console";

// interface MultiSelectInputsProps {
//   id: number;
//   label: string;
//   value: string;
//   options: fieldOption[];
//   labelHandlerCB: (id: number, value: string) => void; // Add this line
//   updateOptionsCB: (id: number, options: fieldOption[]) => void;
//   removeFieldCB: (id: number) => void;
// }

// export default function MultiSelectInput(props: MultiSelectInputsProps) {
//   const [optionValue, setOptionValue] = useState("");

//   const [label, setLabel] = useState(props.label);
//   const [options, setOptions] = useState<fieldOption[]>(props.options);

//   // const isOptionExists = props.option.includes(option);

//   // const addOption = () => {
//   //   if (option && !isOptionExists) {
//   //     props.addOptionCB(props.id, props.label, props.kind, option);
//   //     setOption("");
//   //   }
//   // };

//   const addOption = () => {
//     const option: fieldOption = {
//       id: Number(new Date()),
//       option: "",
//     };
//     setOptions([...options, option]);
//   };

//   const canRemoveOption = props.options.length >= 3;

//   const updateOption = (id: number, newOption: string) => {
//     setOptions(
//       options.map((option) =>
//         option.id === id ? { ...option, option: newOption } : option
//       )
//     );
//   };

//   const removeOption = (id: number) => {
//     setOptions(options.filter((option) => option.id !== id));
//   };

//   useEffect(() => {
//     let timeout = setTimeout(() => {
//       props.labelHandlerCB(props.id, props.label);
//     }, 500);
//     return () => {
//       clearTimeout(timeout);
//     };
//   }, [label]);

//   useEffect(() => {
//     let timeout = setTimeout(() => {
//       props.updateOptionsCB(props.id, options);
//     }, 500);

//     return () => {
//       clearTimeout(timeout);
//     };
//   }, [options]);

//   return (
//     <div className="border-2 border-solid p-5 mt-2 mb-2 rounded bg-white">
//       <label className="block text-gray-700 text-sm font-medium mb-1">
//         Field Name
//       </label>
//       <div className="flex items-center">
//         <label className="text-xl mb-2 mx-auto">{props.label}</label>
//       </div>
//       <select className="w-full p-2 border rounded-md">
//         {props.option.map((opt) => (
//           <option key={opt} value={opt}>
//             {opt}
//           </option>
//         ))}
//       </select>
//       <div className="mt-3 grid grid-cols-2 gap-2">
//         {props.option.map((opt, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between bg-gray-100 p-1 rounded"
//           >
//             <span>{opt}</span>
//             {canRemoveOption && (
//               <button
//                 onClick={() => {
//                   props.removeOptionCB(props.id, props.label, props.kind, opt);
//                 }}
//                 className="text-red-500 hover:text-red-600 p-1 rounded"
//               >
//                 <i className="fi fi-ss-cross"></i>
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="mt-3">
//         <input
//           type="text"
//           className="w-full p-2 border rounded-md"
//           onChange={(e) => {
//             setOption(e.target.value);
//           }}
//           value={option}
//           placeholder="Add Option"
//         />

//         <button
//           onClick={addOption}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg mt-2"
//         >
//           Add Option
//         </button>
//         {isOptionExists && (
//           <p className="text-sm text-red-500 mt-1">Option already exists.</p>
//         )}
//       </div>
//       <button
//         className="bg-red-500 mt-1 hover:bg-blue-600 text-white font-bold py-2 px-1 rounded-lg focus:outline-none focus:shadow-outline-red active:bg-red-500"
//         onClick={() => props.removeFieldCB(props.id)}
//       >
//         Remove component
//       </button>
//     </div>
//   );
// }

export default function Temp() {
  return (
    <div>
      <h1>Temp</h1>
    </div>
  );
}
