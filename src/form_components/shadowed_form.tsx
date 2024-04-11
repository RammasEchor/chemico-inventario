import { Form } from "formik";
import { PropsWithChildren } from "react";

function ShadowedForm(props: PropsWithChildren) {
    return(
        <div className="columns is-centered p-4">
            <Form className="is-flex is-flex-direction-column box column is-6">
                {props.children}
            </Form>
        </div>
    );
}

export default ShadowedForm