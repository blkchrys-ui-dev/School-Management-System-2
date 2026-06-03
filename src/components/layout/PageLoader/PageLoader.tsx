import React from 'react';
import { GraduationCap } from 'lucide-react';

import './pageLoader.css';


// ─────────────────────────────────────────────
// Page Loader
// Used for lazy-loaded routes
// ─────────────────────────────────────────────

const PageLoader = (): React.ReactElement => {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <div className="page-loader-card">

        <div className="page-loader-logo">
          <GraduationCap size={42} />
        </div>

        <div className="page-loader-spinner" />

        <h3 className="page-loader-title">
          Oasis Academy
        </h3>

        <p className="page-loader-text">
          Loading your dashboard...
        </p>

      </div>
    </div>
  );
};

export default PageLoader;