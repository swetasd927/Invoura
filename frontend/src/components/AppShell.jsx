import { useEffect, useState } from 'react';
import { appShellStyles } from '../assets/dummyStyles'
import logo from '../assets/logo.png'
import { useClerk, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom'

const AppShell = () => {
    const navigate = useNavigate();
    const {signOut} = useClerk();
    const {user} = useUser();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(() => {
        try {
            return localStorage.getItem("sidebar_collapsed") === "true";

        } catch {
            return false;
        }
    }) ;

    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    //Check screen size for responsive behavior
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth < 1024) setCollapsed(false);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem("sidebar_collapsed", collapsed ? "true" : "false");
        } catch (err) {}
    }, [collapsed]);

    //Lock body scroll down when mobile drawer is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    //Header scroll effect
    useEffect(()=> {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.remove, EventListener("scroll", handleScroll);
    }, []);

    //toggle sidebar
    const toggleSidebar = () => setCollapsed(!collapsed);

    //for icons
    /* Icons (kept as i have) */
    const DashboardIcon = ({className = "w-5 h-5"}) => {
        <svg
            className={className}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth="1.5"
        >
            <path d= "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points = '9 22 9 12 15 12 15 12'/>
        </svg>
    };
    const InvoiceIcon = ({className = "w-5 h-5"}) => {
        <svg
            className={className}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
        >
            <path d= 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/>
            <polyline  points='14 2 14 8 20 8'/>
            <line x1='16' y1= '13' x2= '8' y2= '13'/>
            <line x1= '16' y1= '17' x2= '8' y2 = '17'/>
            <polyline  points='10 9 9 9 8 9'/>
        </svg>
    };

    const CreateIcon = ({ className = "w-5 h-5" }) => {
        <svg
            className={className}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
        >
            <circle cx = '12' cy = '12' r= '10'/>
            <line x1='12' yl = '8' x2= '12' y2= '16'/>
            <line xl= '8' yl = '12' x2= '16' y2= '12'/>
        </svg>
    };

    const ProfileIcon = ({className = 'w-5 h-5'}) => {
        <svg
            className={className}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
        >
            <path d= 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/>
            <circle cx = '12' cy= '7' r= '4'/>
        </svg>
    };

    const LogoutIcon = ({ className = 'w-5 h-5' }) => {
        <svg
            className={className}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
        >
            <path  d= 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'/>
            <polyline points='16 17 21 12 16 7'/>
            <line x1='21' y1= '12' x2= '9' y2= '12'/>
        </svg>
    };

    const CollapseIcon = ({className= 'w-4 h-4', collapsed}) => {
        <svg
            className={`${className} transition-transform duration-300 ${
                collapsed ? "rotate-180" : ""
            }`}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
        >
            <path 
                strokeLinecap='round'
                strokeLinejoin='round'
                d= 'M'
            />

        </svg>
    }

  return (
    <div className={appShellStyles.root}>
    <div className={appShellStyles.layout}>
    {/*Sidebar*/}
    <aside className={`${appShellStyles.sidebar} ${
        collapsed
            ? appShellStyles.sidebarCollapsed
            : appShellStyles.sidebarExpanded
    }`}
    >
        <div className={appShellStyles.sidebarGradient}></div>
        <div className={appShellStyles.sidebarContainer}>
        <div>
            <div className={`${appShellStyles.logoContainer}  ${
                collapsed ? appShellStyles.logoContainerCollapsed : "" 
            }`}
            >
                <Link to = '/' className = {appShellStyles.logoLink}>
                    <div className='relative'>
                        <img
                            src={logo}
                            alt='logo'
                            className={appShellStyles.logoImage}
                        />
                        <div className='absolute inset-0 rounded-lg blue-sm group-hover blue-md transition-all duration-300 ' />
                    </div>
                    {!collapsed && (
                       <div className={appShellStyles.logoTextContainer}>
                        <span className= {appShellStyles.logoText}>InvoiceAI</span>
                        <div className={appShellStyles.logoUnderline}></div>
                       </div> 
                    )}
                </Link> 

                (!collapsed && (
                    <button onClick={toggleSidebar} className={appShellStyles.collapseButton}>


                    </button>
                ))
            </div>
        </div>
        </div>
    </aside>
    </div>
    </div>
  )
}

export default AppShell