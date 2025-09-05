import React from "react";
import {
  Instagram,
  Heart,
  Code,
  ExternalLink,
  Linkedin,
  Facebook,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg shadow-lg">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Jobs DEV
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Conectando desenvolvedores às melhores oportunidades em
                tecnologia. Encontre sua próxima vaga dos sonhos!
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-emerald-400">
                Links Rápidos
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center"
                  >
                    🏠 Início
                  </a>
                </li>
                <li>
                  <a
                    href="/jobs"
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center"
                  >
                    💼 Vagas
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center"
                  >
                    ℹ️ Sobre
                  </a>
                </li>
              </ul>
            </div>

            {/* Developer Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-emerald-400">
                Desenvolvedor
              </h3>
              <div className="space-y-3">
                <p className="text-gray-300 text-sm">
                  Criado com{" "}
                  <Code className="inline h-4 w-4 text-emerald-400 mx-1" /> por
                  DennisEmannuel_DEV
                </p>

                {/* Social Media Links */}
                <div className="flex flex-col space-y-2">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/dennisemannuel_dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:scale-105"
                  >
                    <Instagram className="h-5 w-5" />
                    <span className="font-semibold">Instagram</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/dennis-emannuel-60b670283/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="font-semibold">LinkedIn</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/dennis.paivalopes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="font-semibold">Facebook</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © {currentYear} DennisEmannuel_DEV. Todos os direitos
                reservados.
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span className="flex items-center space-x-1">
                  <Code className="h-4 w-4" />
                  <span>Feito com React</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>Open Source</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements for visual effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-10 left-10 text-emerald-300/10 text-4xl font-mono animate-pulse">
          {"</>"}
        </div>
        <div className="absolute bottom-16 right-20 text-teal-300/10 text-3xl font-mono animate-bounce">
          {"{}"}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
