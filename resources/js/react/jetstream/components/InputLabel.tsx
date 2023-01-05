import React, { PropsWithChildren } from '@pckg/preact/compat';

interface Props {
  value?: string;
  htmlFor?: string;
}

export default function InputLabel({
  value,
  htmlFor,
  children,
}: PropsWithChildren<Props>) {
  return (
    <label
      className="block font-medium text-sm text-gray-700"
      htmlFor={htmlFor}
    >
      {value || children}
    </label>
  );
}
