import { useEffect, useId, useRef, useState } from "react"
import {
  
  MailIcon,
  SearchIcon,
  
} from "lucide-react"

import Logo from "@/components/ui/logo"
import NotificationMenu from "@/components/ui/notification-menu"
import UserMenu from "@/components/ui/user-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { AnimatePresence, motion } from "framer-motion"

const teams = ["Acme Inc.", "Origin UI", "Junon"]


const navigationLinks = [
  
]

export default function Navbar() {
  const id = useId()
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  // Outside click detection
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // নিচে scroll করলে Navbar লুকাবে
        setShowNavbar(false);
      } else {
        // উপরে scroll করলে Navbar দেখাবে
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);


 

  return (
    <header className={`fixed top-0  left-0 right-0 bg-white shadow transition-transform duration-300 z-50 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}>
      <div className="flex  h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              
            </PopoverTrigger>
            <PopoverContent align="start" className="w-48 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => {
                    const Icon = link.icon
                    return (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink href={link.href} className="flex-row items-center gap-2 py-1.5">
                          <Icon size={16} className="text-muted-foreground" aria-hidden="true" />
                          <span>{link.label}</span>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          <div className="flex items-center gap-6">
            <a href="/" className="text-primary hover:text-primary/90">
              <Logo />
            </a>
            {/* Search form */}
            <div className="relative flex items-center" ref={searchRef}>
  {/* Search button */}
  <button
    type="button"
    onClick={() => setShowSearch(!showSearch)}
    className="p-2 text-gray-600 hover:text-blue-600"
  >
    <SearchIcon size={20} />
  </button>

  {/* 🔹 Desktop Expand Search */}
  <AnimatePresence>
    {showSearch && (
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 280, opacity: 1 }}
        exit={{ width: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="hidden md:block overflow-hidden ml-2"
      >
        <Input
          type="search"
          placeholder="Search..."
          className="h-8 px-2 text-sm"
          autoFocus
        />
      </motion.div>
    )}
  </AnimatePresence>

  {/* 🔹 Mobile Fullscreen Overlay Search */}
  <AnimatePresence>
    {showSearch && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/40 flex items-start md:hidden z-50"
        onClick={() => setShowSearch(false)} //  overlay তে click করলে close হবে
      >
        {/* Inner box (stopPropagation) */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white w-full p-4 relative"
          onClick={(e) => e.stopPropagation()} //  ভেতরে click করলে বন্ধ হবে না
        >
          {/* Close button */}
          <button
            onClick={() => setShowSearch(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
          >
            ✕
          </button>

          <Input
            type="search"
            placeholder="Search..."
            className="w-full h-10 px-3 text-base"
            autoFocus
          />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</div>

          </div>
        </div>
        {/* Middle area */}
        <NavigationMenu className="max-md:hidden">
          <NavigationMenuList className="gap-2">
            {navigationLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    href={link.href}
                    className="flex size-8 items-center justify-center p-1.5"
                    title={link.label}>
                    <Icon aria-hidden="true" />
                    <span className="sr-only">{link.label}</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
        {/* Right side */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="flex items-center gap-2">
            {/* Messages */}
            <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground relative size-8 rounded-full shadow-none"
              aria-label="Open notifications">
              <MailIcon size={16} aria-hidden="true" />
              <div
                aria-hidden="true"
                className="bg-primary absolute top-0.5 right-0.5 size-1 rounded-full" />
            </Button>
            {/* Notification menu */}
            <NotificationMenu />
          </div>
          {/* User menu */}
          <UserMenu />
        </div>
      </div>
     
    </header>
  );
}
