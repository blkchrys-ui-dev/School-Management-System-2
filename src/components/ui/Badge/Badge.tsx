import type { HTMLAttributes, ReactNode } from 'react';

type BadgeTone = 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'slate';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: BadgeTone;
}

const Badge = ({ children, tone = 'blue', className = '', ...props }: BadgeProps): React.ReactElement => {
  return (
    <span className={`ui-badge ui-badge--${tone} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;
