
import { useState, useEffect } from 'react';
import { ChevronLeft, Award, ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Certifications = () => {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / docHeight) * 100;
      setScrollProgress(progress);

      // Animate elements on scroll
      const animatedElements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale-in');
      animatedElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        
        if (isVisible) {
          element.classList.add('visible');
        } else {
          element.classList.remove('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allCertifications = [
    {
      title: "ISTQB Advanced Test Analyst",
      issuer: "International Software Testing Qualifications Board",
      date: "2023",
      level: "Advanced",
      image: "istqb.png",
      link: "https://www.istqb.org/certifications/advanced-level"
    },
    {
      title: "Certified Agile Tester",
      issuer: "iSQI Agile Testing Certification",
      date: "2023",
      level: "Professional",
      image: "agile.png",
      link: "https://www.isqi.org/en/agile-tester"
    },
    {
      title: "Selenium WebDriver Certification",
      issuer: "Selenium Testing Academy",
      date: "2022",
      level: "Expert",
      image: "selenium-cert.png",
      link: "https://www.selenium.dev/documentation/"
    },
    {
      title: "JIRA Administrator Certification",
      issuer: "Atlassian University",
      date: "2022",
      level: "Administrator",
      image: "jira-cert.png",
      link: "https://university.atlassian.com/student/catalog"
    },
    {
      title: "Performance Testing Specialist",
      issuer: "LoadRunner Academy",
      date: "2021",
      level: "Specialist",
      image: "performance.png",
      link: "https://www.microfocus.com/en-us/products/loadrunner-professional"
    },
    {
      title: "Mobile Testing Certification",
      issuer: "Appium Testing Institute",
      date: "2021",
      level: "Certified",
      image: "mobile.png",
      link: "https://appium.io/docs/en/about-appium/intro/"
    },
    {
      title: "API Testing Professional",
      issuer: "Postman Academy",
      date: "2023",
      level: "Professional",
      image: "api.png",
      link: "https://academy.postman.com"
    },
    {
      title: "Test Automation Engineer",
      issuer: "Cypress Testing Institute",
      date: "2022",
      level: "Engineer",
      image: "automation.png",
      link: "https://www.cypress.io"
    },
    {
      title: "Quality Assurance Foundation",
      issuer: "ISEB Quality Foundation",
      date: "2021",
      level: "Foundation",
      image: "qa-foundation.png",
      link: "https://www.bcs.org/qualifications-and-certifications/"
    },
    {
      title: "Security Testing Specialist",
      issuer: "OWASP Security Academy",
      date: "2023",
      level: "Specialist",
      image: "security.png",
      link: "https://owasp.org"
    },
    {
      title: "DevOps Testing Integration",
      issuer: "Jenkins Testing Institute",
      date: "2022",
      level: "Integration",
      image: "devops.png",
      link: "https://www.jenkins.io"
    },
    {
      title: "Database Testing Certification",
      issuer: "SQL Testing Academy",
      date: "2021",
      level: "Certified",
      image: "database.png",
      link: "https://www.w3schools.com/sql/"
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <Button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white border border-white/30"
              size="sm"
            >
              <X className="w-4 h-4" />
            </Button>
            <img
              src={previewImage}
              alt="Certificate Preview"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Animated Starfield Background */}
      <div className="fixed inset-0 starfield-animation parallax-bg" data-speed="0.2"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-indigo-900/30"></div>
      
      {/* Floating Cosmic Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="cosmic-orb cosmic-orb-1 parallax-bg" data-speed="0.3"></div>
        <div className="cosmic-orb cosmic-orb-2 parallax-bg" data-speed="0.4"></div>
        <div className="cosmic-orb cosmic-orb-3 parallax-bg" data-speed="0.5"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Button
              onClick={() => navigate('/')}
              className="bg-transparent text-white hover:bg-purple-600/20 border border-purple-400/30"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="text-white font-bold text-2xl cosmic-glow">🏆 All Certifications</div>
            
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 scroll-fade-in">
            <h1 className="text-5xl font-bold text-white mb-6 cosmic-text">🏆 Complete Certification Portfolio</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A comprehensive collection of professional certifications spanning quality assurance, 
              testing methodologies, automation frameworks, and specialized domains across the cosmic testing universe.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCertifications.map((cert, index) => (
              <Card key={index} className="bg-black/40 backdrop-blur-xl border-purple-500/30 space-card hover-scale group scroll-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6 text-center">
                  <div 
                    className="w-full h-48 mb-4 cursor-pointer group-hover:scale-105 transition-transform duration-300 rounded-lg overflow-hidden border border-purple-400/30"
                    onClick={() => setPreviewImage(`src/assets/certifications/${cert.image}`)}
                  >
                    <img
                      src={`src/assets/certifications/${cert.image}?w=400&h=300&fit=crop`}
                      alt={`${cert.title} certificate`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-3">{cert.title}</h3>
                    <p className="text-purple-300 text-sm mb-4">{cert.issuer}</p>
                    
                    <div className="flex justify-center gap-3 mb-4">
                      <Badge className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 text-emerald-300 border-emerald-400/30 text-sm font-semibold">
                        {cert.level}
                      </Badge>
                      <Badge className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-300 border-blue-400/30 text-sm font-semibold">
                        {cert.date}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-center">
                      <a href={cert.link} target="_blank" rel="noopener noreferrer">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-600/50 to-pink-600/50 hover:from-purple-600 hover:to-pink-600 text-white border border-purple-400/30"
                        >
                          <Award className="w-4 h-4 mr-2" />
                          View Certificate
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Back to Home Section */}
          <div className="flex justify-center mt-16 scroll-fade-in">
            <Button
              onClick={() => navigate('/')}
              size="lg"
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white px-8 py-4 text-lg glow-button"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Return to Portfolio
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Certifications;
