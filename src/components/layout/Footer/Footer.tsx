import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  MapPin,
  Phone,
  Mail,
  Globe,
  GraduationCap,
} from 'lucide-react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';

import './footer.css';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface QuickLink {
  label: string;
  to: string;
}

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
  className: string;
}

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const SCHOOL_NAME = 'The Oasis Academy';

const CONTACT_INFO = {
  address: '10, Pathaar Street Imami Gate, Bhopal - 462001',
  phone: '+91 98765 43210',
  email: 'info@oasisacademy.edu.in',
  website: 'https://www.oasisacademy.edu.in',
};

const QUICK_LINKS: QuickLink[] = [
  {
    label: 'Home',
    to: '/student/dashboard',
  },
  {
    label: 'Notice Board',
    to: '/student/notices',
  },
  {
    label: 'Homework',
    to: '/student/homework',
  },
  {
    label: 'Timetable',
    to: '/student/timetable',
  },
  {
    label: 'Contact Us',
    to: '/student/contact',
  },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: '#',
    icon: <FaFacebook size={18} />,
    label: 'Facebook',
    className: 'facebook',
  },
  {
    href: '#',
    icon: <FaTwitter size={18} />,
    label: 'Twitter',
    className: 'twitter',
  },
  {
    href: '#',
    icon: <FaInstagram size={18} />,
    label: 'Instagram',
    className: 'instagram',
  },
  {
    href: '#',
    icon: <FaLinkedin size={18} />,
    label: 'LinkedIn',
    className: 'linkedin',
  },
];

// ─────────────────────────────────────────────
// Footer Component
// ─────────────────────────────────────────────

const Footer = (): React.ReactElement => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">

          {/* About Section */}
          <section className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">
                <GraduationCap size={32} />
              </div>

              <h3>{SCHOOL_NAME}</h3>
            </div>

            <p className="footer-description">
              Nurturing minds and building futures since 2005.
              Committed to academic excellence, innovation,
              and holistic student development.
            </p>

            <div className="footer-social">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`social-link ${social.className}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </section>

          {/* Quick Links */}
          <section className="footer-section">
            <h4>Quick Links</h4>

            <ul className="footer-links">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Contact Information */}
          <section className="footer-section">
            <h4>Contact Information</h4>

            <ul className="footer-contact">
              <li>
                <MapPin size={16} />
                <span>{CONTACT_INFO.address}</span>
              </li>

              <li>
                <Phone size={16} />
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}>
                  {CONTACT_INFO.phone}
                </a>
              </li>

              <li>
                <Mail size={16} />
                <a href={`mailto:${CONTACT_INFO.email}`}>
                  {CONTACT_INFO.email}
                </a>
              </li>

              <li>
                <Globe size={16} />
                <a
                  href={CONTACT_INFO.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {CONTACT_INFO.website.replace('https://', '')}
                </a>
              </li>
            </ul>
          </section>

          {/* Office Hours */}
          <section className="footer-section">
            <h4>Office Hours</h4>

            <ul className="footer-hours">
              <li>
                <span>Monday – Friday</span>
                <span>9:00 AM – 3:00 PM</span>
              </li>

              <li>
                <span>Saturday</span>
                <span>9:00 AM – 12:00 PM</span>
              </li>

              <li>
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
          </section>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>
            © {currentYear} {SCHOOL_NAME}. All rights reserved.
          </p>

          <p className="footer-credit">
            Made with{' '}
            <Heart size={14} aria-label="love" />
            {' '}for better education
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;