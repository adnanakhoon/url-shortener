const Header = () => {
  return (
    <header className="bg-linear-to-r from-slate-900 to-slate-800 shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          
          {/* Logo / Title */}
          <h1 className="text-2xl font-bold tracking-wide text-white">
            <span className="text-sky-400">URL</span> Shortener
          </h1>

          {/* Right Side (optional actions) */}
          <div className="text-sm text-slate-300 hidden sm:block">
            Make your links shorter and easier to share!
          </div>

        </nav>
      </div>
    </header>
  );
};

export default Header;
