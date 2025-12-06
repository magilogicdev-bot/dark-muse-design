import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Target, Palette, Shield, Zap, HeartHandshake } from "lucide-react";

const advantages = [
  {
    icon: Clock,
    title: "Гарантия сроков",
    description: "Все сроки разработки строго прописаны в договоре. Мы ценим ваше время и всегда укладываемся в дедлайны.",
  },
  {
    icon: Target,
    title: "Гарантия результата",
    description: "Используем проверенные маркетинговые решения. Ваш сайт будет продавать с первого дня запуска.",
  },
  {
    icon: Palette,
    title: "Авторский дизайн",
    description: "Уникальный премиум-дизайн от специалистов с опытом более 8 лет. Никаких шаблонов.",
  },
  {
    icon: Shield,
    title: "Безопасность",
    description: "SSL-сертификат, защита от взломов и регулярное резервное копирование включены в каждый проект.",
  },
  {
    icon: Zap,
    title: "Высокая скорость",
    description: "Оптимизация под PageSpeed 90+. Быстрый сайт = больше конверсий и выше позиции в поиске.",
  },
  {
    icon: HeartHandshake,
    title: "Поддержка 24/7",
    description: "Техническая поддержка и консультации после запуска. Мы всегда на связи для решения любых вопросов.",
  },
];

const Advantages = () => {
  return (
    <section id="advantages" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Преимущества
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Почему выбирают <span className="gradient-text">нас</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Мы не просто делаем сайты — мы создаём инструменты для роста вашего бизнеса
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <Card
              key={index}
              variant="feature"
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <advantage.icon className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl">{advantage.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {advantage.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
