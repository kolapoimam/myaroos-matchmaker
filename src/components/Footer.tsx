
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-black text-white py-12 font-poppins">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
              <div className="relative w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white font-semibold text-xl">
                M
              </div>
              <Link to="/" className="hover:text-brand-green transition-colors">MyAroos</Link>
            </h3>
            <p className="text-gray-300 mb-4">
              A Muslim marriage readiness and compatibility tool to help you make one of the most important decisions in your life.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/marriage-readiness" className="text-gray-300 hover:text-brand-green transition-colors">
                  Marriage Readiness Quiz
                </Link>
              </li>
              <li>
                <Link to="/compatibility" className="text-gray-300 hover:text-brand-green transition-colors">
                  Compatibility Test
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-brand-green transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Disclaimer</h4>
            <p className="text-gray-300 text-sm">
              MyAroos is designed as a guidance tool. Always consult with Islamic scholars, family members, and trusted advisors when making important life decisions like marriage.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} MyAroos. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
