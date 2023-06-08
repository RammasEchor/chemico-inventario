import { ComponentPropsWithoutRef } from "react";

function GhostButton({ className, style, children, ...rest }: ComponentPropsWithoutRef<'button'>) {
    return (
        <button
            className='button is-ghost'
            style={{ whiteSpace: "normal", textAlign: "start", wordBreak: "break-word", wordWrap: "break-word" }}
            {...rest}
        >
            {children}
        </button>
    )
}

export default GhostButton