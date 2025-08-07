import { useEffect, useRef } from "react";

export const useOutsideClick = (handler, listenOnCapturing = true) => {
    const ref = useRef();

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                handler();
            }
        };

        // the third argument here (true) - listens to the event on the capturing phase and not on the bubbling phase (when it goes down the tree instead of bubbling up)
        document.addEventListener("click", handleClick, listenOnCapturing);

        // needs to have the same args
        return () =>
            document.removeEventListener(
                "click",
                handleClick,
                listenOnCapturing
            );
    }, [handler, listenOnCapturing]);

    return ref;
};
