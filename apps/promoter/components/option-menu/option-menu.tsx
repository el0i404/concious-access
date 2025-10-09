/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useRef } from 'react';
import { Flex } from '@awareness/ui'; // Import your Flex component library
import { useClickOutside } from '@react-hooks-library/core';

interface PopoverProps {
  isOpen: boolean;
  setOpenActionMenu: (value: boolean) => void;
  onDuplicate: () => void; // Function to duplicate the dynamic component
  onDelete: () => void; // Function to delete the dynamic component
}

const defaultProps: PopoverProps = {
  isOpen: false,
  setOpenActionMenu: () => {},
  onDuplicate: () => {},
  onDelete: () => {},
};

const Popover: React.FC<PopoverProps> = ({
  isOpen,
  onDuplicate,
  onDelete,
  setOpenActionMenu,
}) => {
  const popoverRef = useRef(null);

  // Use the useClickOutside hook to close the Popover when clicking outside of it
  useClickOutside(popoverRef, () => {
    setOpenActionMenu(false); // Call the provided function to close the Popover
  });

  return (
    <div ref={popoverRef} className="popover-container">
      <Flex justifyContent="flex-end">
        <Flex
          flexDirection={'column'}
          style={{
            width: '175px',
            backgroundColor: 'white',
            borderRadius: '8px',
            paddingLeft: '24px',
            paddingTop: '24px',
          }}
        >
          <div className="action-button-div" onClick={onDuplicate}>
            <span className="action-button-span">Duplicate</span>
          </div>
          <div className="action-button-div" onClick={onDelete}>
            <span className="action-button-span">Delete</span>
          </div>
        </Flex>
      </Flex>

      {/* Styling */}
      <style jsx>{`
        .popover-container {
          position: absolute;
          top: 10%;
          right: 0;
          float: right;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          z-index: 1000;
        }
        .action-button-div {
          padding-bottom: 24px;
          cursor: pointer;
        }
        .action-button-span {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

Popover.defaultProps = defaultProps;
export default Popover;
