"use client";

export default function SocialSidebar() {
  const socials = [
    {
      name: "GitHub",
      url: "https://github.com/SoHaM-250143",
      icon: "/icons/github.svg",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/253019-soham-mhatre/",
      icon: "/icons/linkedin.svg",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/_.sohammm.__?igsh=czhyZHUwY3RmcnV4",
      icon: "/icons/instagram.svg",
    },
    {
      name: "Twitter",
      url: "https://x.com/SohamMh85077807",
      icon: "/icons/twitter.svg",
    },
  ];

  return (
    <div className="social-sidebar-container">
      <div className="social-sidebar-links">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-sidebar-link"
            title={social.name}
          >
            <span 
              className="social-sidebar-icon" 
              style={{
                WebkitMaskImage: `url(${social.icon})`,
                maskImage: `url(${social.icon})`
              }}
              role="img" 
              aria-label={social.name}
            />
          </a>
        ))}
      </div>
      <div className="social-sidebar-line"></div>
    </div>
  );
}

