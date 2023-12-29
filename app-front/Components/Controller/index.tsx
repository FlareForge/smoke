import Icon from '@Components/Icon';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ControllerNavigation = ({ moveToNext, moveToPrev, children }) => {
    const focusedElement = useRef(null);
    const [gamepadUsed, setGamepadUsed] = useState(false);

    useEffect(() => {
        let delay = 0;
        let timeout = null;
        const interval = setInterval(() => {
            if(document.hidden) return;
            const gp = navigator.getGamepads()[0];
            if (!gp) return;
            if (delay > 0) return delay -= 1;
            const inputs = [12, 13, 14, 15, 0, 1, 5, 4].map(index => gp.buttons[index].pressed);
            const [up, down, left, right, xButton, circleButton, rb, lb] = inputs;
            if (up || down || left || right) navigateFocus(up, down, left, right);
            if (xButton) focusedElement?.current?.click?.();
            if (circleButton) window.history.back();
            if (rb) moveToNext();
            if (lb) moveToPrev();
            if (inputs.some(x=>x)) {
                delay = 5
                if(timeout) clearTimeout(timeout);
                setGamepadUsed(true);
                timeout = setTimeout(() => {
                    setGamepadUsed(false)
                }, 15000);
            };
        }, 50);

        window.addEventListener('keydown', dev);

        return () => {
            clearInterval(interval)
            window.removeEventListener('keydown', dev);
        }
    }, []);

    const dev = (e) => {
        if(e.key === 'ArrowUp') navigateFocus(true, false, false, false);
        if(e.key === 'ArrowDown') navigateFocus(false, true, false, false);
        if(e.key === 'ArrowLeft') navigateFocus(false, false, true, false);
        if(e.key === 'ArrowRight') navigateFocus(false, false, false, true);
    }

    const getDistance = (rectA, rectB, direction) => {
        const centerA = { x: (rectA.left + rectA.right) / 2, y: (rectA.top + rectA.bottom) / 2 };
        const centerB = { x: (rectB.left + rectB.right) / 2, y: (rectB.top + rectB.bottom) / 2 };
        return Math.sqrt(Math.pow(centerA.x - centerB.x, 2) * (direction == "x" ? 1 : 4) + Math.pow(centerA.y - centerB.y, 2) * (direction == "y" ? 1 : 4));
    };

    const getNearestElement = (currentElement, direction) => {
        const focusables = Array.from(document.querySelectorAll('.focusable'));
        const currentRect = currentElement?.current?.getBoundingClientRect?.() || { top: 0, left: 0, right: 0, bottom: 0 };
        if (focusables.length === 0) return null;
        return focusables.reduce((nearestElement, element) => {
            const elementRect = element.getBoundingClientRect();
            if ((direction === 'up' && elementRect.bottom < currentRect.top) ||
                (direction === 'down' && elementRect.top > currentRect.bottom) ||
                (direction === 'left' && elementRect.right < currentRect.left) ||
                (direction === 'right' && elementRect.left > currentRect.right)) {
                if (!nearestElement) return element;
                const nearestRect = nearestElement.getBoundingClientRect();
                const nearestDistance = getDistance(currentRect, nearestRect, ['up', 'down'].includes(direction) ? 'y' : 'x');
                const elementDistance = getDistance(currentRect, elementRect, ['up', 'down'].includes(direction) ? 'y' : 'x');
                return elementDistance < nearestDistance ? element : nearestElement;
            }
            return nearestElement;
        }, null);
    };

    const navigateFocus = (up, down, left, right) => {
        let direction = '';
        if (up) direction = 'up';
        else if (down) direction = 'down';
        else if (left) direction = 'left';
        else if (right) direction = 'right';
        const nextElement = getNearestElement(focusedElement, direction);
        if (nextElement) {
            focusedElement?.current?.classList?.remove?.('focused');
            focusedElement?.current?.classList?.add?.('focusable');
            nextElement.classList.add('focused');
            nextElement.classList.remove('focusable');
            focusedElement.current = nextElement;
            nextElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
    };

    return <Container $gamepadUsed={gamepadUsed}>
        <Icon name="buttons/universal/lb.png"/>
        {children}
        <Icon name="buttons/universal/rb.png"/>
    </Container>
};

export default ControllerNavigation;

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: var(--nav-gap);
    position: relative;
    margin-left: ${(props: any) => props.$gamepadUsed ? 'calc(var(--padding) + var(--decade) * 5)' : 'calc(var(--decade) * 1.5)'};

    & > .icon {
        display: ${(props: any) => props.$gamepadUsed ? 'block' : 'none'};
        width: calc(var(--decade) * 6);
        height: calc(var(--decade) * 5);
        position: absolute;

        &:first-child {
            right: calc(100% + var(--decade) * 3);
        }

        &:last-child {
            left: calc(100% + var(--decade) * 3.2);
        }
    }
`;