import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ScanFace, Globe, HelpCircle, BookOpen, UserPlus, LogIn, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [user, setUser] = useState(null);

  // Jab Navbar load ho, check karein ke user login hai ya nahi
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout ka function
  const handleLogout = () => {
    localStorage.removeItem('user'); // Memory se user hata dein
    setUser(null); // State update kar dein
    window.location.href = '/login'; // Wapis login page bhej dein
  };

  // Base menu items jo hamesha rahenge
  const baseItems = [
    { id: 0, title: 'Lang: En', icon: <Globe size={22} />, path: '#' },
    { id: 1, title: 'FAQ', icon: <HelpCircle size={22} />, path: '/faq' },
    { id: 2, title: 'Dictionary', icon: <BookOpen size={22} />, path: '/dictionary' },
  ];

  // Agar user login hai to Profile aur Logout dikhayein, warna Register aur Login
  const authItems = user ? [
    { id: 3, title: user.name ? user.name.split(' ')[0] : 'Profile', icon: <User size={22} />, path: '/profile' },
    { id: 4, title: 'Logout', icon: <LogOut size={22} />, isAction: true, action: handleLogout },
  ] : [
    { id: 3, title: 'Register', icon: <UserPlus size={22} />, path: '/register' },
    { id: 4, title: 'Log In', icon: <LogIn size={22} />, path: '/login' },
  ];

  // Dono arrays ko mila diya (hamesha 5 items rahenge taake animation kharab na ho)
  const navItems = [...baseItems, ...authItems];

  // URL change hone par active index khud ba khud update hoga
  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.path === location.pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname, navItems]);

  return (
    <header className="flex justify-between items-center p-6 md:px-12 w-full absolute top-0 left-0 z-50">
      
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-3 cursor-pointer">
        <div className="bg-white p-2 rounded-xl text-blue-900 shadow-lg">
          <ScanFace size={28} />
        </div>
        <div>
          <h1 className="text-xl font-bold leading-tight text-white">AI Dermatologist</h1>
          <p className="text-xs text-blue-200">Skin Scanner</p>
        </div>
      </Link>
      
      {/* Animated Navigation Section */}
      <nav className="hidden md:block">
        <div className="relative bg-white rounded-full px-4 h-[70px] flex items-center shadow-xl">
          
          {/* Active Indicator */}
          <div 
            className="absolute top-[-22px] w-[60px] h-[60px] transition-transform duration-500 ease-in-out z-10"
            style={{ 
                left: '34px',
                transform: `translateX(${activeIndex * 96}px)` 
            }}
          >
            <div className="absolute w-full h-full bg-[#22c55e] rounded-full border-[6px] border-[#0c2b5e] shadow-sm"></div>
          </div>

          <ul className="flex relative z-20">
            {navItems.map((item, index) => {
              const isActive = activeIndex === index;
              
              // Andar ka content (Icon + Text) jo Button aur Link dono me use hoga
              const itemContent = (
                <>
                  {/* Icon */}
                  <span 
                    className={`absolute transition-all duration-500 z-30 ${
                      isActive 
                        ? 'translate-y-[-34px] text-white' 
                        : 'translate-y-0 text-gray-500 hover:text-blue-500'
                    }`}
                  >
                    {item.icon}
                  </span>
                  
                  {/* Text */}
                  <span 
                    className={`absolute transition-all duration-500 text-[11px] font-bold text-gray-800 text-center px-1 ${
                      isActive 
                        ? 'translate-y-[15px] opacity-100' 
                        : 'translate-y-[30px] opacity-0'
                    }`}
                  >
                    {item.title}
                  </span>
                </>
              );

              return (
                <li key={item.id}>
                  {item.isAction ? (
                    // Logout ke liye button use kiya hai
                    <button 
                      onClick={(e) => {
                        setActiveIndex(index);
                        item.action(e);
                      }}
                      className="w-24 h-[70px] flex justify-center items-center relative cursor-pointer outline-none"
                    >
                      {itemContent}
                    </button>
                  ) : (
                    // Baqi items ke liye Link
                    <Link 
                      to={item.path}
                      onClick={() => setActiveIndex(index)}
                      className="w-24 h-[70px] flex justify-center items-center relative cursor-pointer"
                    >
                      {itemContent}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      
    </header>
  );
};

export default Navbar;