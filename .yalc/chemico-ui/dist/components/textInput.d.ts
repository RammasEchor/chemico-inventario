import { FieldHookConfig } from "formik";
import * as React from 'react';
import { ComponentPropsWithoutRef } from "react";
interface TextInputProps extends ComponentPropsWithoutRef<"input"> {
    label: string;
}
declare function TextInput({ label, ...props }: TextInputProps & FieldHookConfig<string>): React.JSX.Element;
export { TextInput };
