import React, { PropsWithChildren } from "react";

interface ModalProps {
    showModal: boolean
    onClick: () => void
}

function Modal(props: PropsWithChildren & ModalProps) {
    return (
        <div className={`modal ${props.showModal && "is-active"}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                {props.children}
            </div>
            <button
                className="modal-close is-large"
                aria-label="close"
                onClick={props.onClick}
            >
            </button>
        </div>
    );
}

export { Modal };

