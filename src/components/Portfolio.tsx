import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const portfolioItems = [
  {
    title: "ГазХолдер Сервис",
    category: "Корпоративный сайт",
    description: "Сайт компании по обслуживанию газового оборудования",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    title: "AutoParts Pro",
    category: "Интернет-магазин",
    description: "E-commerce платформа автозапчастей с 50 000+ товаров",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    title: "Legal Consult",
    category: "Landing Page",
    description: "Продающий лендинг для юридической компании",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
  },
  {
    title: "FitLife Gym",
    category: "Корпоративный сайт",
    description: "Сайт фитнес-клуба с онлайн-записью",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
  },
  {
    title: "TechStore",
    category: "Интернет-магазин",
    description: "Магазин электроники с интеграцией 1С",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop",
  },
  {
    title: "RealEstate Premium",
    category: "Корпоративный сайт",
    description: "Сайт агентства недвижимости премиум-класса",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Портфолио
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Наши <span className="gradient-text">работы</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Более 250 успешных проектов для компаний разных отраслей
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <Card
              key={index}
              variant="glass"
              className="group overflow-hidden cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <Button variant="glass" size="sm">
                    Смотреть проект
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold mt-2 mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Смотреть все работы
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
