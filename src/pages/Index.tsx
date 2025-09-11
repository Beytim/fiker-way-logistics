import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  Package, 
  Shield, 
  Users, 
  MapPin, 
  Star,
  Globe,
  ChevronRight,
  Phone,
  Mail
} from "lucide-react";
import heroImage from "@/assets/hero-logistics.jpg";

const Index = () => {
  const [language, setLanguage] = useState("English");

  const toggleLanguage = () => {
    setLanguage(language === "English" ? "አማርኛ" : "English");
  };

  const translations = {
    English: {
      hero: {
        title: "FikerWay",
        subtitle: "Ethiopia's Trusted Freight Network",
        description: "Connect shippers with verified drivers across Ethiopia. Safe, reliable, and culturally adapted logistics for your business.",
        cta: "Get Started"
      },
      userTypes: {
        title: "Choose Your Role",
        shipper: {
          title: "I'm a Shipper",
          description: "Send goods across Ethiopia with trusted, verified drivers",
          features: ["Post cargo requests", "Real-time tracking", "Secure payments"]
        },
        driver: {
          title: "I'm a Driver",
          description: "Earn money by transporting goods with your truck",
          features: ["Accept load offers", "Flexible schedule", "Fair earnings"]
        },
        admin: {
          title: "Admin Portal",
          description: "Manage platform operations and oversee logistics",
          features: ["User management", "Analytics", "Payment oversight"]
        }
      },
      features: {
        title: "Why Choose FikerWay?",
        trust: {
          title: "Community Trust",
          description: "Verified drivers with ratings and community endorsements"
        },
        offline: {
          title: "Works Offline",
          description: "Access core features even with poor connectivity"
        },
        local: {
          title: "Locally Adapted",
          description: "Built for Ethiopian logistics with cultural understanding"
        },
        secure: {
          title: "Secure Payments",
          description: "Multiple payment options including Telebirr and cash"
        }
      }
    },
    አማርኛ: {
      hero: {
        title: "ፍከርዋይ",
        subtitle: "የኢትዮጵያ የተመከረ የጭነት መረብ",
        description: "በኢትዮጵያ ውስጥ አስተማማኝ ሾፌሮች ጋር ጭነት ላኪዎችን ያገናኛል። ለንግድዎ ደህንነቱ የተጠበቀ፣ አስተማማኝ እና በባህል የተላመደ ሎጂስቲክስ።",
        cta: "ይጀምሩ"
      },
      userTypes: {
        title: "የእርስዎን ሚና ይምረጡ",
        shipper: {
          title: "እኔ ጭነት ላኪ ነኝ",
          description: "በኢትዮጵያ ውስጥ በተመከሩ ሾፌሮች እቃዎችን ይላኩ",
          features: ["የጭነት ጥያቄዎችን ይለጥፉ", "በተገላቢጦሽ ክትትል", "ደህንነቱ የተጠበቀ ክፍያዎች"]
        },
        driver: {
          title: "እኔ ሾፌር ነኝ",
          description: "በመኪናዎ እቃ በማጓጓዝ ገንዘብ ያግኙ",
          features: ["የጭነት ጥያቄዎችን ይቀበሉ", "ተለዋዋጭ መርሃ ግብር", "ተገቢ ገቢ"]
        },
        admin: {
          title: "የአስተዳዳሪ በር",
          description: "የመድረክ ሥራዎችን ያስተዳድሩ እና ሎጂስቲክስን ይቆጣጠሩ",
          features: ["የተጠቃሚ አስተዳደር", "ትንታኔዎች", "የክፍያ ክትትል"]
        }
      },
      features: {
        title: "ለምን ፍከርዋይን ይመርጣሉ?",
        trust: {
          title: "የማህበረሰብ እምነት",
          description: "በደረጃና በማህበረሰብ ማረጋገጫ የተመዘገቡ ሾፌሮች"
        },
        offline: {
          title: "ከመስመር ውጭ ይሠራል",
          description: "ደካማ ግንኙነት ሲኖር እንኳ ዋና ዋና ባህሪያትን ይደርሱ"
        },
        local: {
          title: "በአካባቢ የተላመደ",
          description: "ለኢትዮጵያ ሎጂስቲክስ በባህል ግንዛቤ የተገነባ"
        },
        secure: {
          title: "ደህንነቱ የተጠበቀ ክፍያዎች",
          description: "ቴሌብርን እና ጥሬ ገንዘብን ጨምሮ ብዙ የክፍያ አማራጮች"
        }
      }
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Truck className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">{t.hero.title}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe className="h-4 w-4" />
              <span>{language}</span>
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Phone className="h-4 w-4 mr-1" />
              Contact
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <Badge className="mb-6 bg-secondary text-secondary-foreground">
              🇪🇹 Made for Ethiopia
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4 font-medium">
              {t.hero.subtitle}
            </p>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              {t.hero.description}
            </p>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
              {t.hero.cta}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* User Type Selection */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.userTypes.title}</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Shipper Card */}
            <Card className="group hover:shadow-medium transition-all duration-300 cursor-pointer border-2 hover:border-primary/50">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-6">
                    <Package className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{t.userTypes.shipper.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t.userTypes.shipper.description}
                  </p>
                  <ul className="space-y-2 text-sm">
                    {t.userTypes.shipper.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-6 w-full bg-primary hover:bg-primary/90">
                    Continue as Shipper
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Driver Card */}
            <Card className="group hover:shadow-medium transition-all duration-300 cursor-pointer border-2 hover:border-accent/50">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-trust rounded-full flex items-center justify-center mb-6">
                    <Truck className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{t.userTypes.driver.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t.userTypes.driver.description}
                  </p>
                  <ul className="space-y-2 text-sm">
                    {t.userTypes.driver.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="mt-6 w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    Continue as Driver
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Admin Card */}
            <Card className="group hover:shadow-medium transition-all duration-300 cursor-pointer border-2 hover:border-warning/50">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mb-6">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{t.userTypes.admin.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t.userTypes.admin.description}
                  </p>
                  <ul className="space-y-2 text-sm">
                    {t.userTypes.admin.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-warning rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="mt-6 w-full border-warning text-warning hover:bg-warning hover:text-warning-foreground">
                    Admin Access
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.features.title}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-success/20 transition-colors">
                <Users className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{t.features.trust.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.features.trust.description}</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                <MapPin className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{t.features.offline.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.features.offline.description}</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{t.features.local.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.features.local.description}</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-warning/20 transition-colors">
                <Shield className="h-8 w-8 text-warning" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{t.features.secure.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.features.secure.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Truck className="h-6 w-6 text-secondary" />
              <span className="text-lg font-semibold">{t.hero.title}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <a href="mailto:info@fikerway.com" className="flex items-center space-x-1 hover:text-secondary transition-colors">
                <Mail className="h-4 w-4" />
                <span>info@fikerway.com</span>
              </a>
              <a href="tel:+251911234567" className="flex items-center space-x-1 hover:text-secondary transition-colors">
                <Phone className="h-4 w-4" />
                <span>+251 911 234 567</span>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-background/20 text-center text-sm opacity-75">
            <p>© 2024 FikerWay. Built with ❤️ for Ethiopia's logistics future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;