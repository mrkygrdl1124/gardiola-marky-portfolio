

import { useState, useEffect } from 'react';
import { ChevronDown, Download, Github, Linkedin, Mail, ExternalLink, Award, Briefcase, Calendar, FolderOpen, Quote, X, MapPin, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'education', 'certificates', 'projects', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

      // Calculate scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / docHeight) * 100;
      setScrollProgress(progress);

      // Update active section
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Parallax effect for background elements
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      parallaxElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const speedAttr = element.getAttribute('data-speed');
        const speed = speedAttr ? parseFloat(speedAttr) : 0.5;
        const yPos = -(window.scrollY * speed);
        const htmlElement = element as HTMLElement;
        htmlElement.style.transform = `translateY(${yPos}px)`;
      });

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadCV = () => {
    // Create a dummy PDF download - in a real app, you'd link to your actual CV
    const link = document.createElement('a');
    link.href = './src/assets/resume/Gardiola_Mark_Louise_QA_Resume.pdf';
    link.download = 'Gardiola_Mark_Louise_QA_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'projects', label: 'Projects' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
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
            <div className="text-white font-bold text-2xl cosmic-glow">🚀 Mark Louise Gardiola</div>
            
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-white hover:text-purple-300 transition-all duration-300 relative nav-item ${
                    activeSection === item.id ? 'text-purple-300 active' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Button
              onClick={downloadCV}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border border-purple-400/30 glow-button"
            >
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-24 pb-32">
        <div className="relative z-10 text-center text-white px-4 scroll-fade-in">
          <div className="mb-8 scroll-scale-in">
            <Avatar className="w-32 h-32 mx-auto mb-6 cosmic-avatar">
              <AvatarImage 
                src="./src/assets/mark.png" 
                alt="Mark Louise Gardiola - QA Engineer Profile Picture" 
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 text-white text-4xl font-bold">
                MG
              </AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 cosmic-text scroll-slide-left">
            Mark Louise Gardiola
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-200 interactive-title group cursor-pointer scroll-slide-right">
            🧪 <span className="cosmic-title-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">Cosmic Quality Assurance Engineer</span> & <span className="cosmic-title-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">Testing Specialist</span>
          </p>
          <p className="text-lg mb-12 max-w-2xl mx-auto text-gray-300 scroll-fade-in">
            Exploring the universe of quality, ensuring stellar software experiences through comprehensive testing and analysis across digital galaxies.
          </p>
          
          {/* Statistics Cards */}
          <div className="flex justify-center gap-8 mb-12 scroll-scale-in">
            <Card className="bg-black/40 backdrop-blur-xl border-purple-500/30 space-card">
              <CardContent className="p-6 text-center">
                <Briefcase className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">1</div>
                <div className="text-sm text-gray-300">Year Experience</div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/40 backdrop-blur-xl border-purple-500/30 space-card">
              <CardContent className="p-6 text-center">
                <FolderOpen className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">3</div>
                <div className="text-sm text-gray-300">Projects Tested</div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/40 backdrop-blur-xl border-purple-500/30 space-card">
              <CardContent className="p-6 text-center">
                <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">6</div>
                <div className="text-sm text-gray-300">Certifications</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center space-x-6 mb-12 scroll-fade-in">
            <a href="#" className="text-white hover:text-purple-400 transition-all duration-300 hover:scale-110">
              <Github className="w-8 h-8" />
            </a>
            <a href="#" className="text-white hover:text-purple-400 transition-all duration-300 hover:scale-110">
              <Linkedin className="w-8 h-8" />
            </a>
            <a href="#" className="text-white hover:text-purple-400 transition-all duration-300 hover:scale-110">
              <Mail className="w-8 h-8" />
            </a>
          </div>
          <Button
            onClick={() => scrollToSection('about')}
            className="bg-white text-black hover:bg-black hover:text-white border border-purple-400/50 transition-all duration-300 glow-button scroll-fade-in"
          >
            Explore Testing Galaxy
            <ChevronDown className="w-4 h-4 ml-2 animate-bounce" />
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16 cosmic-text scroll-fade-in">🌟 About the Quality Guardian</h2>
          
          {/* Big Hero Card with Background */}
          <div className="mb-16 scroll-fade-in">
            <Card className="bg-black/40 backdrop-blur-xl border-purple-500/30 space-card hover-scale overflow-hidden">
              <div className="relative h-96 md:h-80">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=600&fit=crop')`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
                </div>
                
                {/* Content Overlay */}
                <div className="relative z-10 h-full flex items-center">
                  <div className="p-8 md:p-12 max-w-2xl">
                    <div className="flex items-center mb-6">
                      <Avatar className="w-24 h-24 mr-4 cosmic-avatar">
                        <AvatarImage 
                          src="./src/assets/mark.png" 
                          alt="Mark Louise Gardiola - QA Engineer Profile Picture" 
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 text-white text-xl font-bold">
                          MG
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Mark Louise Gardiola</h3>
                        <p className="text-xl text-purple-300">Quality Assurance Engineer</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-200 text-lg leading-relaxed mb-6">
                      Passionate about ensuring software excellence across digital universes. 
                      With expertise in manual and automated testing, I transform complex systems 
                      into reliable, user-friendly experiences.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center text-white">
                        <MapPin className="w-5 h-5 text-purple-400 mr-3" />
                        <span>Imus, Cavite - Philippines</span>
                      </div>
                      <div className="flex items-center text-white">
                        <Users className="w-5 h-5 text-purple-400 mr-3" />
                        <span>1 Year Experience</span>
                      </div>
                      <div className="flex items-center text-white">
                        <Zap className="w-5 h-5 text-purple-400 mr-3" />
                        <span>Quality Focused</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Portrait Layout - Single Column */}
          <div className="space-y-8">
            <Card className="bg-black/40 backdrop-blur-xl border-purple-500/30 space-card hover-scale scroll-slide-left">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
                  <span className="mr-2">🧪</span> Who I Am
                </h3>
                <p className="text-gray-300 leading-relaxed text-center">
                  I'm a cosmic quality guardian with 1 year of experience ensuring software excellence 
                  across the digital universe. My mission is to identify bugs before they reach production 
                  and maintain the highest standards of quality in every application.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/40 backdrop-blur-xl border-purple-500/30 space-card hover-scale scroll-slide-right">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
                  <span className="mr-2">🔍</span> What I Do
                </h3>
                <p className="text-gray-300 leading-relaxed text-center">
                  I design comprehensive test strategies, perform manual and automated testing, 
                  analyze system behaviors, and ensure applications meet quality standards 
                  that are as reliable as the laws of physics.
                </p>
              </CardContent>
            </Card>
            
            {/* Cosmic Testing Technologies - Smaller Square Cards */}
            <div className="mt-24">
              <h3 className="text-4xl font-bold text-white mb-16 text-center flex items-center justify-center arsenal-title scroll-fade-in">
                <span className="mr-4">⚡</span> Cosmic Tech Stack Arsenal
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  { name: 'Selenium', logo: 'selenium.png', label: 'Testing' },
                  { name: 'Playwright', logo: 'playwright.png', label: 'Testing' },
                  { name: 'Robot Framework', logo: 'robot_framework.png', label: 'Testing' },
                  { name: 'Postman', logo: 'postman.png', label: 'API Testing' },
                  { name: 'Mockoon', logo: 'mockoon.png', label: 'API Mocking' },
                  { name: 'Python', logo: 'python.png', label: 'Programming' },
                  { name: 'C', logo: 'c.png', label: 'Programming' },
                  { name: 'C++', logo: 'c++.png', label: 'Programming' },
                  { name: 'C#', logo: 'csharp.png', label: 'Programming' },
                  { name: 'JavaScript', logo: 'javascript.png', label: 'Programming' },
                  { name: 'JIRA', logo: 'jira.png', label: 'Project Mgmt' },
                  { name: 'Git', logo: 'git.png', label: 'Version Control' },
                  { name: 'Bitbucket', logo: 'bitbucket.png', label: 'Repository' },
                  { name: 'HTML', logo: 'html.png', label: 'Web Dev' },
                  { name: 'CSS', logo: 'css.png', label: 'Web Dev' },
                  { name: 'Figma', logo: 'figma.png', label: 'Design' },
                  { name: 'SourceTree', logo: 'sourcetree.png', label: 'Git GUI' },
                  { name: 'Github', logo: 'github.png', label: 'Version Control' },
                ].map((tech, index) => (
                  <Card key={tech.name} className={`bg-black/40 backdrop-blur-xl border-purple-500/30 space-card hover-scale group scroll-scale-in`} style={{animationDelay: `${index * 0.1}s`}}>
                    <CardContent className="p-4 aspect-square flex flex-col items-center justify-center text-center">
                      <div className="w-10 h-10 mb-3 rounded-lg overflow-hidden group-hover:scale-110 transition-transform duration-300">
                        <img
                          src={`./src/assets/techstack/${tech.logo}?w=40&h=40&fit=crop`}
                          alt={`${tech.name} logo`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <h4 className="text-white font-bold text-sm mb-2">{tech.name}</h4>
                      <Badge className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 border-purple-400/30 text-xs">
                        {tech.label}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-4 bg-black/20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16 cosmic-text scroll-fade-in">🚀 Testing Missions</h2>
          
          <div className="space-y-12">
            {[
              {
                title: "Quality Assurance Engineer (Intern)",
                company: "Filpass Tamperproof Tech. Inc. || BEfied (fka Edufied) Pte. Ltd",
                period: "February 2025 - August 2025",
                description: "Leading comprehensive testing strategies across multiple star systems, mentoring junior QA analysts, and implementing automated testing frameworks that ensure zero-defect deployments.",
                technologies: ["Manual Testing", "Automation Testing", "Playwright", "JavaScript", "Postman", "JIRA"],
                logo: "./src/assets/company/befied_logo.jpeg?w=200&h=200&fit=crop&crop=center",
                alignment: "left"
              },
              {
                title: "Software Quality Assurance Tester",
                company: "EasyPOS Solutions.Inc (Deliverit Software Pty Ltd)", 
                period: "April 2024 - July 2024",
                description: "Designed and executed detailed test plans for web and mobile applications, performed exploratory testing across different dimensions, and collaborated with development teams to ensure quality standards.",
                technologies: ["Manual Testing", "Xcode", "SourceTree", "Git", "iOS"],
                logo: "./src/assets/company/easypos_logo.jpeg?w=200&h=200&fit=crop&crop=center",
                alignment: "right"
              },
              {
                title: "Quality Assurance Engineer (Intern)",
                company: "SkyDev Solutions.Inc",
                period: "February 2023 - May 2023",
                description: "Performed manual testing for various planetary applications, documented bugs and test cases, participated in agile ceremonies, and contributed to quality assurance processes.",
                technologies: ["Manual Testing", "Automation Testing", "Selenium", "Robot Framework", "Python","Mockoon","Postman","monday.com"],
                logo: "./src/assets/company/skydev.jpg?w=200&h=200&fit=crop&crop=center",
                alignment: "left"
              }
            ].map((job, index) => (
              <Card key={index} className={`bg-black/40 backdrop-blur-xl border-purple-500/30 space-card hover-scale ${index % 2 === 0 ? 'scroll-slide-left' : 'scroll-slide-right'}`}>
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-purple-400/50 flex-shrink-0 mb-4">
                      <img
                        src={job.logo}
                        alt={`${job.company} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
                      <p className="text-purple-300 text-lg mb-2">{job.company}</p>
                      <Badge className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-300 border-blue-400/30">
                        {job.period}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4 text-center">{job.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {job.technologies.map((tech) => (
                      <Badge key={tech} className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 border-purple-400/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16 cosmic-text scroll-fade-in">🎓 Quality Education</h2>
          
          <div className="space-y-8">
            {[
              {
                degree: "Bachelor's Degree in Information Technology",
                school: "Gordon College - Olongapo City",
                period: "August 2019 - July 2024",
                description: "Completed a comprehensive undergraduate program in Information Technology, developing a strong foundation in software development, systems analysis, database management, and network administration. The extended academic journey provided deeper experience through hands-on projects, internships, and collaborative learning. Built practical skills in both front-end and back-end development, and gained exposure to real-world IT environments that strengthened adaptability and problem-solving capabilities."
              },
              {
                degree: "Junior / Senior High School Graduate",
                school: "Santa Cruz Academy ― Sta.Cruz, Zambales",
                period: "June 2013 - March 2019",
                description: "Completed Junior and Senior High School with a specialization in the Technical-Vocational-Livelihood (TVL) track, focusing on Information and Communications Technology (ICT). Gained practical experience in technical drafting and 2D/3D animation, developing a strong foundation in digital design, creativity, and technical accuracy. This track helped build early familiarity with industry-relevant tools and workflows, fostering both technical and artistic skills applicable to IT and multimedia fields."
              },
              {
                degree: "Elementary School Graduate",
                school: "Don Marcelo C. Marty Elementary School (DMCMES)",
                period: "June 2006 - March 2013",
                description: "Completed primary education with a solid academic foundation and active participation in school activities. Developed essential skills in communication, mathematics, and critical thinking that supported later success in technology-focused studies."
              }
            ].map((edu, index) => (
              <Card key={index} className={`bg-black/40 backdrop-blur-xl border-purple-500/30 space-card hover-scale ${index % 2 === 0 ? 'scroll-slide-left' : 'scroll-slide-right'}`}>
                <CardContent className="p-8">
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                    <p className="text-purple-300 text-lg mb-2">{edu.school}</p>
                    <Badge className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-300 border-blue-400/30">
                      {edu.period}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-center">{edu.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-24 px-4 bg-black/20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16 cosmic-text scroll-fade-in">🏆 Quality Certifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Python From Scratch & Selenium WebDriver QA Automation 2024",
                issuer: "Udemy - Admas Kinfu",
                date: "2024-2025",
                level: "Beginner - Advanced",
                image: "1.jpg",
                link: "https://www.udemy.com/certificate/UC-1c52a039-e157-4f44-865b-a890610678e2/"
              },
              {
                title: "Automated Software Testing with Playwright",
                issuer: "Udemy - Kaniel Outis",
                date: "2025",
                level: "Beginner - Advanced",
                image: "2.jpg",
                link: "https://www.udemy.com/certificate/UC-0bffdea7-88aa-4756-b140-2ee5f1eb7424/"
              },
              {
                title: "Learn Selenium with Python using Robot framework",
                issuer: "Udemy - Pavan Kumar",
                date: "2025",
                level: "Beginner - Advanced",
                image: "3.jpg",
                link: "https://www.udemy.com/certificate/UC-123e0282-e692-4cc3-8a89-7900cf3d9e3b/"
              }
            ].map((cert, index) => (
              <Card key={index} className="bg-black/40 backdrop-blur-xl border-purple-500/30 space-card hover-scale group scroll-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6 text-center">
                  <div 
                    className="w-full h-48 mb-4 cursor-pointer group-hover:scale-105 transition-transform duration-300 rounded-lg overflow-hidden border border-purple-400/30"
                    onClick={() => setPreviewImage(`./src/assets/certifications/${cert.image}`)}
                  >
                    <img
                      src={`./src/assets/certifications/${cert.image}?w=400&h=300&fit=crop`}
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

          {/* View More Certifications Button 
          <div className="flex justify-center mt-16 scroll-fade-in">
            <Button
              onClick={() => navigate('/certifications')}
              size="lg"
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white px-8 py-4 text-lg glow-button"
            >
              <Award className="w-5 h-5 mr-2" />
              View More Certifications
            </Button>
          </div>*/}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16 cosmic-text scroll-fade-in">🛸 Testing Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Filpass.ph",
                description: "FilPass.ph is a project under the BEfied Group, that delivers an end-to-end solution for secure digital credentials—leveraging blockchain for authenticity, simplifying proof of identity for individuals, and enhancing document issuance workflows for organizations. It perfectly blends Web3 innovation, local relevance, and user-first design for the Philippine market.",
                technologies: ["Playwright", "JavaScript", "JIRA", "BitBucket", "Postman API"],
                image: "filpass.jpeg",
                testLink: "https://filpass.ph",
                codeLink: "https://github.com/GardiolaMarkLouise/filpass-testing",
                hasSourceCode: false
              },
              {
                title: "Financial Planning Association of Singapore (FPAS)",
                description: "FPAS provides education, certification, and advocacy for financial planning professionals, including the prestigious Certified Financial Planner (CFP®) designation. As a member of the global Financial Planning Standards Board (FPSB), FPAS promotes ethical practices, lifelong learning, and financial literacy initiatives to empower both professionals and the public with sound financial knowledge.",
                technologies: ["Playwright", "JavaScript", "JIRA", "BitBucket", "Postman API"],
                image: "fpas.jpg",
                testLink: "https://fpas.org.sg",
                codeLink: null,
                hasSourceCode: false
              },
              {
                title: "Project Studio",
                description: "Project Studio is an Australian-based logistics and delivery management company that specializes in integrated, secure, and efficient courier services across metropolitan and regional areas. It partners with businesses of all sizes—retailers, e-commerce platforms, government bodies—to optimize their delivery networks, reduce operational costs, and deliver outstanding end-user experiences.",
                technologies: ["Manual Testing", "JIRA", "Excel", "Xcode", "iOS","SourceTree","Git"],
                image: "deliverit-logo.jpg",
                testLink: "https://deliverit.com.au",
                codeLink: null,
                hasSourceCode: false
              }
            ].map((project, index) => (
              <Card key={index} className="bg-black/40 backdrop-blur-xl border-purple-500/30 space-card hover-scale group scroll-scale-in" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={`./src/assets/projects/${project.image}?w=400&h=250&fit=crop`}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-purple-900/20 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 text-center">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-center">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 border-purple-400/30 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-3 justify-center">
                    <a href={project.testLink} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="project-button-primary">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Tests
                      </Button>
                    </a>
                    {project.hasSourceCode ? (
                      <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="project-button-secondary">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                      </a>
                    ) : (
                      <Button 
                        size="sm" 
                        className="project-button-secondary opacity-50 cursor-not-allowed"
                        disabled
                        title="Source code not available for this project"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Private Code
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-4 bg-black/20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16 cosmic-text scroll-fade-in">⭐ Cosmic Testimonials</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Arthur Tristan Ramos",
                role: " Senior Mobile Application Developer",
                company: "EasyPOS Solutions.Inc", 
                company2: "(Deliverit Software Pty Ltd)",
                image: "arthur.jpeg",
                testimonial: "Mark is a good Quality Assurance Engineer who has the passion and attention to detail to make software better. He studies his craft well and continues to learn. He does not hesitate in contributing ideas. Working with him in a team was a true pleasure. He makes the work environment friendly by being a good friend to his teammate. He is a gem when you work with him, a lot of potential."
              },
              {
                name: "John David Bombuhay",
                role: "Quality Assurance Engineer & Operational Lead",
                company: "Filpass Tamperproof Tech. Inc.",
                company2: "BEfied (fka Edufied) Pte. Ltd]",
                image: "JD.jpg",
                testimonial: "#Character Locked."
              },
              {
                name: "Allen Aouie Ardaniel",
                role: "Software Engineer / Project Manager",
                company: "Filpass Tamperproof Tech. Inc.",
                company2: "BEfied (fka Edufied) Pte. Ltd",
                image: "allen.jpeg",
                testimonial: "#Character Locked."
              },
              {
                name: "Shadrach Fidel Liwanan",
                role: "Former Quality Assurance Engineer",
                company: "Filpass Tamperproof Tech. Inc.",
                company2: "BEfied (fka Edufied) Pte. Ltd",
                image: "shad.jpg",
                testimonial: "Although I have only worked with Mark for a month or so, I found that he is one of the most driven, reliable, and supportive co-worker I had a pleasure of working with. His outlook and the way he conducts himself on the job is nothing short of top-notch. From how he can easily pick up and excel on the tasks thrown at him, to how his passion for growth is inspiring for his workmates - he is without of a doubt a great person to work with and can bring a lot to the table. As a QA Engineer, he has this structured approach in testing which makes his work thorough. He has helped a great deal with the development through testing, and has helped out quite a lot on client-related tasks. He doesn't shy away from challenges, and is always eager to help in any way he can. There is no doubt that Mark's trajectory as a professional will only go up.."
              },
              {
                name: "John Kobe Estacio",
                role: "Former Quality Assurance Engineer / Software Developer",
                company: "Filpass Tamperproof Tech. Inc. || BEfied (fka Edufied) Pte. Ltd]",
                company2: "Fairchild Cebu Community Multi-Purpose Cooperative",
                image: "kobe.jpg",
                testimonial: "Mark has exhibited qualities befitting of someone who coordinates with many people effectively. He does not shy away from questioning, which highlights his eagerness to learn, and is quite peculiar in noting even the most minute changes in the codes we had to handle.This attitude is best observed when he is placed in unfamiliar scenarios with insufficient information. He tries to understand it on his own before reaching out to his superior for clarification or help. As one of his superiors, I had the pleasure of working with him and have observed all these things firsthand. I highly recommend Mark for tasks that require a great deal of attention to detail and logic building.."
              },
              {
                name: "Kurt Russel Pablo",
                role: "Former Quality Assurance Engineer",
                company: "Filpass Tamperproof Tech. Inc.",
                company2: "BEfied (fka Edufied) Pte. Ltd]",
                image: "kurt.jpg",
                testimonial: "I've had the pleasure of working with Mark Louise Gardiola as part of our QA team, and he's truly an exceptional co-intern. Despite being early in his career, Mark jumped into API testing with confidence and curiosity. When I introduced him to Postman and data-driven collections, he picked up the concepts quickly, asked smart questions, and was soon running tests like a pro. What really stands out is his ability to break down and absorb complex workflows, then apply them independently and consistently. His attention to detail and eagerness to learn make him a rare kind of intern—someone who adds real value from day one. Mark's initiative and growth mindset are already making a positive impact on the team. I'm excited to see where his career goes, and I'd gladly recommend him to any team looking for a standout in QA.."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-black/40 backdrop-blur-xl border-purple-500/30 space-card hover-scale group scroll-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <Quote className="w-8 h-8 text-purple-400 mx-auto mb-4 group-hover:animate-pulse" />
                  </div>
                  
                  <div className="mb-6">
                    <Avatar className="w-16 h-16 mx-auto mb-4 cosmic-avatar">
                      <AvatarImage 
                        src={`./src/assets/testimonials/${testimonial.image}?w=200&h=200&fit=crop&crop=face`}
                        alt={`${testimonial.name} profile picture`}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 text-white text-lg font-bold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <p className="text-gray-300 mb-6 text-sm leading-relaxed italic">
                    "{testimonial.testimonial}"
                  </p>
                  
                  <div className="border-t border-purple-500/20 pt-4">
                    <h4 className="text-white font-bold text-lg mb-1">{testimonial.name}</h4>
                    <p className="text-purple-300 text-sm mb-2">{testimonial.role}</p>
                    <Badge className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-300 border-blue-400/30 text-xs">
                      {testimonial.company}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-300 border-blue-400/30 text-xs">
                      {testimonial.company2}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-black/20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8 cosmic-text scroll-fade-in">📡 Quality Contact</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto scroll-fade-in">
            Ready to ensure your software reaches cosmic quality standards? Let's collaborate to create 
            bug-free experiences that are truly stellar! Connect with me across the testing universe.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Mail",
                href: "mailto:marklouise.gardiola1124@gmail.com",
                displayText: "marklouise.gardiola1124@gmail.com",
                icon: <Mail className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              },
              {
                title: "LinkedIn",
                href: "https://linkedin.com/in/mrklgrdl1124",
                displayText: "linkedin.com/in/mrklgrdl1124",
                icon: <Linkedin className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              },
              {
                title: "Github",
                href: "https://github.com/GardiolaMarkLouise/",
                displayText: "github.com/GardiolaMarkLouise",
                icon: <Github className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              }
            ].map((contact, index) => (
              <a 
                key={index} 
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className={`bg-black/40 backdrop-blur-xl border-purple-500/30 space-card hover-scale scroll-scale-in cursor-pointer transition-all duration-300 hover:border-purple-400/50 h-full`} style={{animationDelay: `${index * 0.1}s`}}>
                  <CardContent className="p-6 text-center flex flex-col justify-center h-full min-h-[200px]">
                    {contact.icon}
                    <h3 className="text-xl font-bold text-white mb-3">{contact.title}</h3>
                    <p className="text-gray-300 hover:text-purple-300 transition-colors text-sm break-all px-2">
                      {contact.displayText}
                    </p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
          
          <Button
            onClick={downloadCV}
            size="lg"
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white px-8 py-4 text-lg glow-button scroll-fade-in"
          >
            <Download className="w-5 h-5 mr-2" />
            Download CV Resume
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center text-gray-300 border-t border-purple-500/30 relative z-20 bg-black/80 backdrop-blur-xl scroll-fade-in">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4 cosmic-text">🚀 Mark Louise Gardiola</h3>
            <p className="text-lg text-purple-200 mb-6">
              Thank you for exploring my cosmic quality assurance universe!
            </p>
          </div>
          
          <div className="border-t border-purple-500/20 pt-8">
            <p className="text-lg text-gray-400">
              &copy; 2025 Mark Louise Gardiola - Quality Assurance Engineer
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Ensuring quality across the universe 🧪✨
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

