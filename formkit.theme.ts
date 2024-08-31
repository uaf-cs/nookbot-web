import { generateClasses } from "@formkit/themes";

const textClassification = {
  input: `
  $reset
   input 
   input-bordered
   w-full 
   max-w-xs
   focus-within:input-primary
   formkit-invalid:input-error
  `,
  label: "text-sm formkit-invalid:text-red-500",
};
const buttonClassification = {
  input: "$reset btn btn-primary",
};

const theme = {
  // the global key will apply to all inputs
  global: {
    help: "text-xs text-gray-500 m-1",
    message: "$reset text-error text-xs m-1",
    label: "$reset label-text m-1",
    outer: "$reset my-2",
  },
  button: buttonClassification,
  date: textClassification,
  "datetime-local": textClassification,
  checkbox: {
    input: "$reset checkbox checkbox-primary",
    inner: "$reset flex items-center",
    label: "$reset ml-2 label-text",
    legend: "$reset font-bold px-1",
    wrapper: "$reset cursor-pointer flex items-center justify-start max-w-fit",
    option: "$reset mb-2",
    optionHelp: "$reset text-sm text-gray-600 ml-8",
  },
  email: textClassification,
  month: textClassification,
  number: textClassification,
  password: textClassification,
  radio: {
    input: "$reset radio radio-primary",
    inner: "$reset flex items-center",
    label: "$reset ml-2 label-text",
    legend: "$reset font-bold px-1",
    wrapper: "$reset cursor-pointer flex items-center justify-start max-w-fit",
  },
  range: {
    input: "$reset range range-secondary",
  },
  search: textClassification,
  select: {
    ...textClassification,
    input: "$reset select select-bordered w-full",
  },
  submit: buttonClassification,
  tel: textClassification,
  text: textClassification,
  textarea: {
    input: `
    $reset
    textarea
    input-bordered
    focus-within:input-primary
    formkit-invalid:input-error
    `,
  },
  time: textClassification,
  url: textClassification,
  week: textClassification,
};

export const classes: Record<string, string | Record<string, boolean>> =
  generateClasses(theme) as Record<string, string | Record<string, boolean>>;
