import type { ReactNode } from 'react';
import './statCard.css';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  helperText?: string;
  tone?: 'blue' | 'green' | 'orange' | 'purple';
}

const StatCard = ({ icon, label, value, helperText, tone = 'blue' }: StatCardProps): React.ReactElement => {
  return (
    <article className={`ui-stat-card ui-stat-card--${tone}`}>
      <div className="ui-stat-card__icon">{icon}</div>
      <div>
        <p className="ui-stat-card__label">{label}</p>
        <strong className="ui-stat-card__value">{value}</strong>
        {helperText && <span className="ui-stat-card__helper">{helperText}</span>}
      </div>
    </article>
  );
};

export default StatCard;
