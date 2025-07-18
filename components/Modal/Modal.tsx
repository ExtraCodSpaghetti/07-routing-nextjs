'use client'
import css from './Modal.module.css'
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useCallback } from "react"

type ModalProps = {
  children: ReactNode;
  onClose?: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
   const router = useRouter();

 const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  }, [onClose, router]);

   useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', onEsc);
    return () => removeEventListener('keydown', onEsc);
   }, [handleClose]);

   return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>

    </div>
   )
}

export default Modal;
