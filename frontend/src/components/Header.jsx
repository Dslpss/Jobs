import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Code,
  Settings,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  Star,
  Menu,
  X,
  Heart,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setShowMobileMenu(false);
  };

  return (
    <header className="bg-gradient-to-r from-white/95 via-emerald-50/90 to-white/95 backdrop-blur-xl border-b border-emerald-200/50 sticky top-0 z-50 shadow-lg shadow-emerald-500/10">
      {/* Premium glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/10 to-emerald-500/5 opacity-50"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-2 right-10 text-emerald-500">
          <Sparkles className="h-4 w-4 animate-pulse" />
        </div>
        <div className="absolute bottom-2 left-20 text-teal-500">
          <Star className="h-3 w-3 animate-pulse delay-700" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 p-3 rounded-xl group-hover:shadow-xl group-hover:shadow-emerald-500/30 transition-all duration-500 transform group-hover:scale-110">
                <Code className="h-7 w-7 text-white" />
              </div>
              {/* Premium indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent group-hover:from-emerald-500 group-hover:to-teal-500 transition-all duration-300">
                  DevJobs
                </span>
                <div className="relative hidden sm:block">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg">
                    v2.1
                  </span>
                  <div className="absolute -top-1 -right-1 h-2 w-2 bg-yellow-400 rounded-full animate-ping"></div>
                </div>
              </div>
              <span className="text-xs text-emerald-600/70 font-medium -mt-1 hidden sm:block">
                Premium Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/">
              <Button
                variant={location.pathname === "/" ? "default" : "ghost"}
                className={
                  location.pathname === "/"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transform hover:scale-105 transition-all duration-300 font-semibold"
                    : "hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300 font-medium"
                }
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Vagas
              </Button>
            </Link>

            <Link to="/favorites">
              <Button
                variant={
                  location.pathname === "/favorites" ? "default" : "ghost"
                }
                className={
                  location.pathname === "/favorites"
                    ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transform hover:scale-105 transition-all duration-300 font-semibold"
                    : "hover:bg-red-50 hover:text-red-700 transition-all duration-300 font-medium"
                }
              >
                <Heart className="h-4 w-4 mr-2" />
                Favoritos
              </Button>
            </Link>

            <Link to="/profile">
              <Button
                variant={location.pathname === "/profile" ? "default" : "ghost"}
                className={
                  location.pathname === "/profile"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300 font-semibold"
                    : "hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 font-medium"
                }
              >
                <User className="h-4 w-4 mr-2" />
                Perfil
              </Button>
            </Link>

            {isAuthenticated ? (
              <>
                {user?.isAdmin && (
                  <Link to="/admin">
                    <Button
                      variant={
                        location.pathname === "/admin" ? "default" : "ghost"
                      }
                      className={
                        location.pathname === "/admin"
                          ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transform hover:scale-105 transition-all duration-300 font-semibold"
                          : "hover:bg-orange-50 hover:text-orange-700 transition-all duration-300 font-medium"
                      }
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Admin
                      <Star className="h-3 w-3 ml-2 text-yellow-400" />
                    </Button>
                  </Link>
                )}

                {/* User Menu Premium */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 px-4 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 border border-emerald-200/50"
                  >
                    <div className="relative">
                      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-lg">
                        {user?.email?.[0]?.toUpperCase() ||
                          user?.name?.[0]?.toUpperCase() ||
                          "U"}
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-semibold text-emerald-700">
                        {user?.email?.split("@")[0] || user?.name || "Usuário"}
                      </span>
                      <span className="text-xs text-emerald-600/70">
                        Premium User
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-emerald-600 transition-transform duration-300" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-emerald-200/50 py-2 z-50 transform transition-all duration-300">
                      <div className="px-4 py-3 border-b border-emerald-100/50 bg-gradient-to-r from-emerald-50/50 to-teal-50/50">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold">
                            {user?.email?.[0]?.toUpperCase() ||
                              user?.name?.[0]?.toUpperCase() ||
                              "U"}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {user?.email?.split("@")[0] ||
                                user?.name ||
                                "Usuário"}
                            </p>
                            <p className="text-xs text-emerald-600 flex items-center">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              Premium Account
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 flex items-center transition-all duration-300 group"
                      >
                        <LogOut className="h-4 w-4 mr-3 group-hover:text-red-500" />
                        Sair da conta
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300 font-medium px-6"
                  >
                    Entrar
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transform hover:scale-105 transition-all duration-300 font-semibold px-6">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Cadastrar
                  </Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden bg-emerald-50 hover:bg-emerald-100 p-2 rounded-lg transition-colors duration-200"
          >
            {showMobileMenu ? (
              <X className="h-6 w-6 text-emerald-600" />
            ) : (
              <Menu className="h-6 w-6 text-emerald-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-emerald-200/50 shadow-lg z-40">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
              {/* Mobile Vagas Link */}
              <Link to="/" onClick={() => setShowMobileMenu(false)}>
                <div
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                    location.pathname === "/"
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                      : "hover:bg-emerald-50 text-emerald-700"
                  }`}
                >
                  <Sparkles className="h-5 w-5" />
                  <span className="font-medium">Vagas</span>
                </div>
              </Link>

              {isAuthenticated ? (
                <>
                  {/* Mobile Admin Link */}
                  {user?.isAdmin && (
                    <Link to="/admin" onClick={() => setShowMobileMenu(false)}>
                      <div
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                          location.pathname === "/admin"
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                            : "hover:bg-orange-50 text-orange-700"
                        }`}
                      >
                        <Settings className="h-5 w-5" />
                        <span className="font-medium">Admin</span>
                        <Star className="h-4 w-4 text-yellow-400" />
                      </div>
                    </Link>
                  )}

                  {/* Mobile User Info */}
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-200/50">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold">
                        {user?.email?.[0]?.toUpperCase() ||
                          user?.name?.[0]?.toUpperCase() ||
                          "U"}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {user?.email?.split("@")[0] ||
                            user?.name ||
                            "Usuário"}
                        </p>
                        <p className="text-xs text-emerald-600 flex items-center">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Premium Account
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-700 p-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="font-medium">Sair da conta</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Mobile Login/Register */}
                  <Link to="/login" onClick={() => setShowMobileMenu(false)}>
                    <div className="w-full hover:bg-emerald-50 text-emerald-700 p-3 rounded-lg transition-all duration-300 text-center">
                      <span className="font-medium">Entrar</span>
                    </div>
                  </Link>
                  <Link to="/register" onClick={() => setShowMobileMenu(false)}>
                    <div className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-3 rounded-lg shadow-lg flex items-center justify-center space-x-2 transition-all duration-300">
                      <Sparkles className="h-4 w-4" />
                      <span className="font-medium">Cadastrar</span>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
