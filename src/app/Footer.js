import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-8 mt-12 text-center text-sm text-gray-700">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <span className="font-bold text-black text-lg">National Placement Portal</span> &copy; {new Date().getFullYear()}<br />
          <span className="block mt-1 text-xs text-gray-600">
            Empowering Indian students, recruiters, and institutions with a unified platform for placements and internships.<br />
            For support, email <a href="mailto:support@placementportal.in" className="text-blue-700 underline">support@placementportal.in</a> or call <a href="tel:+911234567890" className="text-blue-700 underline">+91-12345-67890</a>.<br />
            Made with ❤️ in India. All rights reserved.
          </span>
        </div>
        <div className="flex flex-wrap gap-4 justify-center md:justify-end">
          <a href="#about" className="hover:underline">About</a>
          <a href="#features" className="hover:underline">Features</a>
          <a href="#faq" className="hover:underline">FAQ</a>
          <a href="#contact" className="hover:underline">Contact</a>
          <a href="#terms" className="hover:underline">Terms</a>
          <a href="#privacy" className="hover:underline">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
