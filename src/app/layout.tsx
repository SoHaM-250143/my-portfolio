import "./globals.css";

export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <div className="updation-overlay">
          {/* TOP LEFT: LOGO + NAME */}
          <div className="updation-top-left">
            <img
              src="/logo.png"
              alt="Logo"
              className="updation-logo"
            />
            <span className="updation-name">Soham Mhatre</span>
          </div>

          {/* CENTER MESSAGE */}
          <div className="updation-center">
            <h1>🚧 Website Under Updation</h1>
            <p>I am currently improving this website.</p>
            <p>Please check back soon.</p>
          </div>
        </div>
      </body>
    </html>
  );
}
