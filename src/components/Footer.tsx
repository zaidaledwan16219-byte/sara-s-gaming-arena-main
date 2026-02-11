import React from 'react';

const socialLinks = [
  { name: 'TikTok', url: 'https://www.tiktok.com/@sara.gaming20?_r=1&_t=ZS-93pSi3FPHGS', icon: '🎵' },
  { name: 'Instagram', url: 'https://www.instagram.com/sara.gamingg20?igsh=OGp4MDhzZTc3OXpn', icon: '📸' },
  { name: 'Discord', url: 'https://discord.gg/3xVuS34Ce', icon: '💬' },
  { name: 'Telegram', url: 'https://t.me/saragaming20', icon: '✈️' },
  { name: 'Kick', url: 'https://kick.com/saragaming20', icon: '🎮' },
];

const Footer: React.FC = () => (
  <footer className="w-full py-8 mt-12 border-t border-border">
    <div className="container mx-auto px-4 text-center">
      <h3 className="text-lg font-bold gold-text mb-4">تابعنا على</h3>
      <div className="flex justify-center gap-4 flex-wrap mb-6">
        {socialLinks.map(link => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl gold-border hover:gold-shadow transition-all duration-300 text-foreground hover:text-primary"
          >
            <span>{link.icon}</span>
            <span className="text-sm font-semibold">{link.name}</span>
          </a>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">© 2024 Sara Game. جميع الحقوق محفوظة.</p>
    </div>
  </footer>
);

export default Footer;
