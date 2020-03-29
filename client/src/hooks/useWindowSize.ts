import { useLayoutEffect, useState } from 'react';
import { Window } from '../types';

export const useWindowSize = () => {
    const isClient = typeof window === 'object';

    const getSize = (): Window => {
        return {
            width: isClient ? window.innerWidth : 0,
            height: isClient ? window.innerHeight : 0,
        };
    };

    const [windowSize, setWindowSize] = useState(getSize);

    useLayoutEffect((): any => {
        if (!isClient) {
            return false;
        }

        let timeoutId: any = null;

        const resizeListener = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setWindowSize(getSize()), 100);
        };

        window.addEventListener('resize', resizeListener);
        return () => window.removeEventListener('resize', resizeListener);
    }, []);

    return windowSize;
};
