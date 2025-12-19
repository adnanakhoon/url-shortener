const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-slate-900 to-slate-800 mt-6">
      <div className="container mx-auto px-4 py-4 text-center">
        <p className="text-sm text-slate-300">
          © {new Date().getFullYear()}{" "}
          <span className="text-sky-400 font-medium">URL Shortener</span>. 
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
