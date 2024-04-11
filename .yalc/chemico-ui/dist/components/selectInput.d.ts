import { FieldHookConfig } from "formik";
import * as React from 'react';
import { ComponentPropsWithoutRef } from "react";
interface SelectInputProps extends ComponentPropsWithoutRef<"select"> {
    label: string;
}
declare function SelectInput({ label, ...props }: SelectInputProps & FieldHookConfig<string>): React.JSX.Element;
export { SelectInput };
