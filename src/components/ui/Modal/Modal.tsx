import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import './modal.css';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ isOpen, title, children, onClose }: ModalProps): React.ReactElement | null => {
  if (!isOpen) return null;

  return (
    <div className="ui-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="ui-modal" role="dialog" aria-modal="true" aria-label={title ?? 'Dialog'} onMouseDown={event => event.stopPropagation()}>
        <header className="ui-modal__header">
          {title && <h2>{title}</h2>}
          <button type="button" className="ui-modal__close" onClick={onClose} aria-label="Close modal"><X size={18} /></button>
        </header>
        <div className="ui-modal__body">{children}</div>
      </section>
    </div>
  );
};

export default Modal;
