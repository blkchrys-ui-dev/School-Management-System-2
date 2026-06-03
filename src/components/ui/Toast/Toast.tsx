import { CheckCircle, Info, TriangleAlert, XCircle } from 'lucide-react';
import './toast.css';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose?: () => void;
}

const ICONS = { success: CheckCircle, error: XCircle, warning: TriangleAlert, info: Info };

const Toast = ({ message, type = 'info', onClose }: ToastProps): React.ReactElement => {
  const Icon = ICONS[type];

  return (
    <div className={`ui-toast ui-toast--${type}`} role="status">
      <Icon size={20} />
      <span>{message}</span>
      {onClose && <button type="button" onClick={onClose} aria-label="Dismiss notification">×</button>}
    </div>
  );
};

export default Toast;
