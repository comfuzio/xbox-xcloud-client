import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';
type GamepadNavContextType = {
  setActiveGroup: (groupId: string) => void;
  activeGroup: string;
};

const GamepadNavigationContext = createContext<GamepadNavContextType>({
  activeGroup: 'default',
  setActiveGroup: () => {},
});

export const GamepadNavigationProvider = ({ children }: { children: ReactNode }) => {
  const [activeGroup, setActiveGroupState] = useState('default');
  const prevButtons = useRef<boolean[]>([]);
  
  // Instead of saving element, save a 'selector-like' path
  const lastFocusedPathByGroup = useRef<Map<string, string>>(new Map());

  const getElementPath = (el: HTMLElement) => {
    if (!el) return '';
    const path = [];
    let current: HTMLElement | null = el;

    while (current && current !== document.body) {
      const index = Array.from(current.parentNode?.children || []).indexOf(current);
      path.unshift(index);
      current = current.parentElement;
    }

    return path.join('-'); // example: "2-5-1" (body > div:nth-child(3) > ul:nth-child(6) > li:nth-child(2))
  };

  const getElementByPath = (path: string) => {
    if (!path) return null;
    const indexes = path.split('-').map((i) => parseInt(i, 10));
    let current: Element | null = document.body;

    for (const index of indexes) {
      if (!current) return null;
      current = current.children[index];
    }

    return current as HTMLElement;
  };

  const moveFocus = (direction: Direction) => {
    let current = document.activeElement as HTMLElement;
    const isValidElement = current?.hasAttribute?.('data-nav');

    if (!isValidElement) {
      const path = lastFocusedPathByGroup.current.get(activeGroup);
      current = getElementByPath(path || '') || document.querySelector<HTMLElement>(`[data-nav][data-nav-group="${activeGroup}"]`)!;
      if (current) current.focus();
      return;
    }

    const currentRect = current.getBoundingClientRect();
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-nav]')
    ).filter(
      (el) =>
        el.tabIndex >= 0 &&
        (el.getAttribute('data-nav-group') || 'default') === activeGroup
    );

    let best: HTMLElement | null = null;
    let bestDistance = Infinity;

    for (const el of elements) {
      if (el === current) continue;
      const rect = el.getBoundingClientRect();

      const isValid = {
        up: rect.bottom <= currentRect.top,
        down: rect.top >= currentRect.bottom,
        left: rect.right <= currentRect.left,
        right: rect.left >= currentRect.right,
      }[direction];

      if (!isValid) continue;

      const dx = rect.left - currentRect.left;
      const dy = rect.top - currentRect.top;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < bestDistance) {
        best = el;
        bestDistance = distance;
      }
    }

    if (best) {
      best.focus();
      best.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  };

  const handleAction = () => {
    const current = document.activeElement as HTMLElement;
    current?.click?.();
  };

  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (!target?.hasAttribute('data-nav')) return;

      const groupId = target.getAttribute('data-nav-group') || 'default';
      const path = getElementPath(target);
      if (path) {
        lastFocusedPathByGroup.current.set(groupId, path);
      }
    };

    window.addEventListener('focusin', handleFocus);
    return () => window.removeEventListener('focusin', handleFocus);
  }, []);

  useEffect(() => {
    const pollGamepad = () => {
      const gamepads = navigator.getGamepads();
      const gp = gamepads[0];
      if (!gp) return;

      const buttons = gp.buttons.map((btn) => btn.pressed);
      const wasPressed = (i: number) => buttons[i] && !prevButtons.current[i];

      if (wasPressed(12)) moveFocus('up');
      if (wasPressed(13)) moveFocus('down');
      if (wasPressed(14)) moveFocus('left');
      if (wasPressed(15)) moveFocus('right');
      if (wasPressed(0)) handleAction(); // A button
      if (wasPressed(1)) setActiveGroup('default'); // B button

      prevButtons.current = buttons;
    };

    const interval = setInterval(pollGamepad, 100);
    return () => clearInterval(interval);
  }, [activeGroup]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          moveFocus('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveFocus('down');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          moveFocus('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveFocus('right');
          break;
        case 'Enter':
          handleAction();
          break;
        case 'Escape':
          setActiveGroup('default');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGroup]);

  const setActiveGroup = (groupId: string) => {
    setActiveGroupState(groupId);

    setTimeout(() => {
      const path = lastFocusedPathByGroup.current.get(groupId);
      let el: HTMLElement | null = getElementByPath(path || '');

      if (!el) {
        el = document.querySelector<HTMLElement>(
          `[data-nav][data-nav-group="${groupId}"]`
        );
      }

      if (el) {
        el.focus();
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 0);
  };

  return (
    <GamepadNavigationContext.Provider value={{ setActiveGroup, activeGroup }}>
      {children}
    </GamepadNavigationContext.Provider>
  );
};

export const useGamepadNavigation = () => useContext(GamepadNavigationContext);
