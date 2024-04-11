import * as React from 'react';
import { ComponentPropsWithoutRef } from 'react';
interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
    isLoading?: boolean;
}
declare function CellButton(props: ButtonProps): React.JSX.Element;
export { CellButton };
