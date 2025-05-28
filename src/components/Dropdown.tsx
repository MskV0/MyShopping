import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
  buttonClassName?: string;
  menuClassName?: string;
  containerClassName?: string;
  maxHeight?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  onToggle,
  trigger,
  children,
  buttonClassName = '',
  menuClassName = '',
  containerClassName = '',
  maxHeight = '300px'
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const triggerElement = triggerRef.current;
      const menuElement = menuRef.current;

      if (!triggerElement || !menuElement) return;

      const triggerRect = triggerElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;
      const menuHeight = parseInt(maxHeight);
      
      // Determine if the menu should open upward or downward
      const shouldOpenUpward = spaceBelow < menuHeight && spaceAbove > spaceBelow;
      
      menuElement.style.position = 'fixed';
      menuElement.style.maxHeight = maxHeight;
      menuElement.style.overflowY = 'auto';
      menuElement.style.width = `${triggerRect.width}px`;
      menuElement.style.zIndex = '9999';

      if (shouldOpenUpward) {
        menuElement.style.bottom = `${viewportHeight - triggerRect.top + 8}px`;
        menuElement.style.top = 'auto';
      } else {
        menuElement.style.top = `${triggerRect.bottom + window.scrollY + 8}px`;
        menuElement.style.bottom = 'auto';
      }
      
      menuElement.style.left = `${triggerRect.left + window.scrollX}px`;
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, maxHeight]);

  return (
    <div className={`relative ${containerClassName}`}>
      <div ref={triggerRef} onClick={onToggle}>
        {trigger}
      </div>
      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className={`bg-white dark:bg-dark-card rounded-xl shadow-lg border border-gray-100 dark:border-dark-border overflow-hidden ${menuClassName}`}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(156, 163, 175, 0.5) transparent'
            }}
          >
            <div className="py-1">
              {children}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Dropdown; 