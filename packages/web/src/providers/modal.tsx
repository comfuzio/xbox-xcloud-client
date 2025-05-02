// components/ModalProvider.tsx
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@heroui/react";
  import { createContext, useContext, useState, ReactNode, useEffect } from "react";

  import { useGamepadNavigation } from "./gamepadnav"
  
  interface ModalOptions {
    title: string;
    body?: ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }
  
  const ModalContext = createContext<((options: ModalOptions) => void) | undefined>(undefined);
  
  export function ModalProvider({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);
    const { setActiveGroup } = useGamepadNavigation();
  
    const showModal = (options: ModalOptions) => {
      setModalOptions(options);
      onOpen();
    };
  
    const handleClose = () => {
      onOpenChange();
      setModalOptions(null);
    };
  
    const handleConfirm = () => {
      modalOptions?.onConfirm?.();
      handleClose();
    };
  
    const handleCancel = () => {
      modalOptions?.onCancel?.();
      handleClose();
    };

    useEffect(() => {
        if(isOpen === true) {
            setActiveGroup('modal');
            return () => setActiveGroup('default');
        }
    }, [isOpen]);
  
    return (
      <ModalContext.Provider value={showModal}>
        {children}
  
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="greenlight bg-background text-foreground">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">{modalOptions?.title}</ModalHeader>

                <ModalBody>{modalOptions?.body}</ModalBody>
                
                <ModalFooter>
                  <Button data-nav data-nav-group="modal" onPress={() => { handleCancel(); onClose(); }}>
                    {modalOptions?.cancelText || "Cancel"}
                  </Button>
                  <Button data-nav data-nav-group="modal" color="primary" onPress={() => { handleConfirm(); onClose(); }}>
                    {modalOptions?.confirmText || "Confirm"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </ModalContext.Provider>
    );
  }
  
  export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
      throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
  };
  