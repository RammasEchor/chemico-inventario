import { PropsWithChildren } from "react"


function Checkbox(props: PropsWithChildren) {
    return (
        <label className="checkbox">
            <input type="checkbox" />
            {` ${props.children}`}
        </label>
    )
}

export default Checkbox