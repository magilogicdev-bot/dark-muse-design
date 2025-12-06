import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const contacts = [
    { icon: Phone, label: "+7 (916) 926-97-82", href: "tel:+79169269782" },
    { icon: Phone, label: "+375 33 377-75-37", href: "tel:+375333777537" },
    { icon: Mail, label: "info@restart-site.ru", href: "mailto:info@restart-site.ru" },
    { icon: MapPin, label: "Москва, Россия", href: "#" },
  ];

  const links = [
    { label: "Услуги", href: "#services" },
    { label: "Портфолио", href: "#portfolio" },
    { label: "Преимущества", href: "#advantages" },
    { label: "Контакты", href: "#contact" },
  ];

  return (
    <footer id="contact" className="py-16 border-t border-border/50 bg-card/30">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <a href="/" className="inline-block mb-4">
              <span className="text-3xl font-bold">
                RE<span className="text-primary">START</span>
              </span>
            </a>
            <p className="text-muted-foreground max-w-md mb-6">
              Разработка, обслуживание и продвижение сайтов. Создаём продающие веб-решения для бизнеса с 2016 года.
            </p>
            <div className="flex gap-3">
              <Button variant="glass" size="icon" className="rounded-full">
                <MessageCircle className="w-5 h-5" />
              </Button>
              <Button variant="glass" size="icon" className="rounded-full">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Навигация</h4>
            <nav className="flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-bold text-lg mb-4">Контакты</h4>
            <div className="flex flex-col gap-3">
              {contacts.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <contact.icon className="w-4 h-4 text-primary" />
                  <span>{contact.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} RESTART. Все права защищены.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Договор-оферта
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
