import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const benefits = [
  "Бесплатная консультация и аудит",
  "Индивидуальное коммерческое предложение",
  "Расчёт стоимости за 5 минут",
  "Скидка 10% при заказе сегодня",
];

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-accent/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4">
        <div className="glass-card p-8 md:p-12 lg:p-16 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-primary">Ограниченное предложение</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Готовы начать?{" "}
            <span className="gradient-text">Получите бесплатную консультацию</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Расскажите о вашем проекте, и мы подготовим индивидуальное предложение с точной стоимостью и сроками
          </p>

          {/* Benefits List */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 text-left">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="glow" size="xl">
              Получить предложение
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="glass" size="lg">
              Позвонить сейчас
            </Button>
          </div>

          {/* Trust Text */}
          <p className="text-xs text-muted-foreground mt-6">
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
