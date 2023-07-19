import { PropsWithChildren } from "react";

interface PropsTabla {
    cols: string[]
    className?: string
}

function Tabla(props: PropsTabla & PropsWithChildren) {
    const jsx_cols = props.cols.map((name) => {
        return (<th key={name}>{name}</th>);
    });

    return (
        <div className={`table-container ` + props.className}>
            <table className="table is-hoverable is-fullwidth is-striped">
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
}

export default Tabla