import { useState, useEffect } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default (element: React.MutableRefObject<HTMLInputElement>, rootMargin: any) => {
    const [isVisible, setState] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setState(entry.isIntersecting);
                    observer.unobserve(element.current);
                }
            },
            {
                rootMargin
            }
        );

        element.current && observer.observe(element.current);
        return () => {
            // observer.unobserve(element.current);
        };
    }, [element, rootMargin]);

    return isVisible;
};
