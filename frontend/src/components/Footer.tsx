// src/components/Footer.tsx
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { COMPANY } from "@/config/company";
import { NAV_LINKS } from "@/data/navigation";
import { phoneLink, mailLink } from "@/utils/links";
import Logo from "@/assets/qualicom-logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info - Logo only, no text */}
          <div className="space-y-4">
            <img
              src={Logo}
              alt={`${COMPANY.name} logo`}
              className="h-12 w-auto object-contain"
            />
            <p className="text-sm leading-relaxed">{COMPANY.tagline}</p>
            <div className="space-y-2">
              <a
                href={phoneLink()}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">{COMPANY.phone}</span>
              </a>
              <a
                href={mailLink()}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">{COMPANY.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-white font-semibold mb-4">Nos bureaux</h4>
            <div className="space-y-4">
              <div>
                <h5 className="text-white mb-2">Côte d'Ivoire</h5>
                <p className="flex items-start text-gray-400 text-sm">
                  <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                  <span>{COMPANY.addresses.ivoryCoast}</span>
                </p>
              </div>
              <div>
                <h5 className="text-white mb-2">Mali</h5>
                <p className="flex items-start text-gray-400 text-sm">
                  <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                  <span>{COMPANY.addresses.mali}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Besoin d'informations ?
            </h4>
            <Link
              to="/contact"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Contactez-nous
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} {COMPANY.name}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
