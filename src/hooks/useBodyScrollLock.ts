import { useEffect } from 'react';

export const useBodyScrollLock = (isLocked: boolean): void => {
    useEffect(() => {
        if (!isLocked) return;

        const originalOverflow = document.body.style.overflow;
        const originalPosition = document.body.style.position;
        const originalWidth = document.body.style.width;
        const originalPaddingRight = document.body.style.paddingRight;

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.position = originalPosition;
            document.body.style.width = originalWidth;
            document.body.style.paddingRight = originalPaddingRight;
        };
    }, [isLocked]);
};
