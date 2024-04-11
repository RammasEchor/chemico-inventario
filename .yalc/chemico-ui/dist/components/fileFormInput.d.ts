import { FieldHookConfig } from 'formik';
import * as React from 'react';
import { ComponentPropsWithoutRef } from 'react';
interface FileFormInputInterface extends ComponentPropsWithoutRef<"input"> {
    label: string;
}
declare function FileFormInput({ label, ...props }: FileFormInputInterface & FieldHookConfig<string>): React.JSX.Element;
export { FileFormInput };
