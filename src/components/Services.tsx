import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, ShoppingCart, Briefcase, Smartphone, Search, Wrench } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Корпоративные сайты",
    description: "Представительство компании в интернете с современным дизайном и удобной навигацией",
    price: "от 80 000 ₽",
  },
  {
    icon: ShoppingCart,
    title: "Интернет-магазины",
    description: "Полнофункциональные e-commerce решения с интеграцией платёжных систем",
    price: "от 150 000 ₽",
  },
  {
    icon: Briefcase,
    title: "Landing Page",
    description: "Продающие одностраничники с высокой конверсией для рекламных кампаний",
    price: "от 40 000 ₽",
  },
  {
    icon: Smartphone,
    title: "Мобильная адаптация",
    description: "Оптимизация существующего сайта под все устройства и размеры экранов",
    price: "от 25 000 ₽",
  },
  {
    icon: Search,
    title: "SEO продвижение",
    description: "Комплексная оптимизация для выхода в ТОП поисковых систем",
    price: "от 30 000 ₽/мес",
  },
  {
    icon: Wrench,
    title: "Техподдержка",
    description: "Обслуживание, обновления и круглосуточная техническая поддержка",
    price: "от 10 000 ₽/мес",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container relative z-10 px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Услуги
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Что мы <span className="gradient-text">предлагаем</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Полный спектр услуг для создания и развития вашего присутствия в интернете
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              variant="glow"
              className="group relative overflow-hidden"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription className="mt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">{service.price}</span>
                <Button variant="ghost" size="sm" className="group/btn">
                  Подробнее
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            Обсудить проект
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
