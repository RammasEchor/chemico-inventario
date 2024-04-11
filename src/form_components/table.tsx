import React, { ComponentPropsWithoutRef, LegacyRef, forwardRef } from "react";

interface PropsTabla {
    cols: string[]
    className?: string
}

const Tabla = forwardRef(function Tabla(props: PropsTabla & ComponentPropsWithoutRef<'table'>, ref: LegacyRef<HTMLTableElement>) {
    const jsx_cols = props.cols.map((name) => {
        return (<th className="has-text-centered" key={name}>{name}</th>);
    });

    return (
        <div className={`table-container` + props.className}>
            <table className="table is-hoverable is-fullwidth is-striped has-text-centered" ref={ref}>
                <thead>
                    <tr>
                        {jsx_cols}
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        {jsx_cols}
                    </tr>
                </tfoot>
                <tbody>
                    {props.children}
                </tbody>
            </table>
        </div>
    );
});

export default Tabla