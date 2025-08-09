import { createPortal } from "react-dom";
import styled from "styled-components";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { HiXMark } from "react-icons/hi2";
import { cloneElement, createContext, useContext, useState } from "react";

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 3.2rem 4rem;
    transition: all 0.5s;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 1000;
    transition: all 0.5s;
`;

const Button = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1.2rem;
    right: 1.9rem;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        /* Sometimes we need both */
        /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
        color: var(--color-grey-500);
    }
`;

const ModalContext = createContext();

// it is actually not necessary or the best idea to use this compound component for this but he just wanted to demonstrate it I guess
const Modal = ({ children }) => {
    const [openName, setOpenName] = useState("");

    const close = () => setOpenName("");
    const open = setOpenName;

    return (
        <ModalContext.Provider value={{ openName, setOpenName, close, open }}>
            {children}
        </ModalContext.Provider>
    );
};

const Open = ({ children, opens: opensWindowName }) => {
    const { open } = useContext(ModalContext);

    // cloneElement is rarely used and shouldn't be overused but here it allows us to pass the props to the children of this component which wouldn't be possible
    return cloneElement(children, { onClick: () => open(opensWindowName) });
};

// React PORTAL is a feature that essentially allows us to render a component in any place that we want inside the DOM Tree but still leave the component at the same place in the react component tree and so then things like props keep working normally and it is great and generally used for all elements that you want to stay on top of other elements so things like MODAL WINDOWS, TOOLTIPS
// instead of just returning this JSX we return the results of calling createPortal (part of react-dom) - this function here receives as the first argument JSX that you want to render and then as the second argument a DOM note where we want to render this JSX (document.body, documents.querySelector('XXX'), etc.)
// the main reason to avoid conflicts with the CSS property overflow: hidden set on the parent so this is basically all about reusability and making sure that the component will never be cut off by an overflow property set to hidden on some parent element so we simply render the modal completely outside of the rest of the DOM basically on top of the DOM Tree as we do here
const Window = ({ children, name }) => {
    const { openName, close } = useContext(ModalContext);

    const ref = useOutsideClick(close);

    if (name !== openName) return null;

    return createPortal(
        <Overlay>
            <StyledModal ref={ref}>
                <Button onClick={close}>
                    <HiXMark />
                </Button>

                {/* here again we have to clone the children to pass the props we need for the children - here the onCloseModal */}
                <div>{cloneElement(children, { onCloseModal: close })}</div>
            </StyledModal>
        </Overlay>,
        document.body
    );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
