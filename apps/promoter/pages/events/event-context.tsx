// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from 'react';

export const ModalContext = React.createContext<{
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEventData: React.Dispatch<
    React.SetStateAction<Record<string, string | number>>
  >;
  eventData: Record<string, string | number>;
  isMobile?: boolean;
} | null>(null);

const EventContext = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventData, setEventData] = useState({
    id: '',
    date: '',
    location: '',
    name: '',
    sharable_link: '',
  });

  return (
    <ModalContext.Provider
      value={{ isModalOpen, setIsModalOpen, setEventData, eventData }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useEventModal = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [eventData, setEventData] = useState({
    id: '',
    date: '',
    location: '',
    name: '',
    sharable_link: '',
  });

  return { isModalOpen, setIsModalOpen, eventData, setEventData };
};

export default EventContext;
