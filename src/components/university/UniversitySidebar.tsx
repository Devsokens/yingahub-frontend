import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    GraduationCap,
    MessageSquare,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Building2,
    Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/contexts/AuthContext";

const mainItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/university/dashboard" },
    { icon: GraduationCap, label: "Applications", href: "/university/applications" },
    { icon: MessageSquare, label: "Messages", href: "/university/messages" },
    { icon: Users, label: "Students", href: "/university/students" },
];

const bottomItems = [
    { icon: Settings, label: "Settings", href: "/university/settings" },
];

export default function UniversitySidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className={cn(
            "h-screen bg-[#1E3A5F] text-white transition-all duration-300 flex flex-col relative",
            isCollapsed ? "w-20" : "w-64"
        )}>
            {/* Header with Logo */}
            <div className="p-6 flex flex-col items-center justify-center border-b border-white/10 overflow-hidden">
                <div className={cn(
                    "transition-all duration-300 flex flex-col items-center justify-center",
                    isCollapsed ? "h-12 w-12" : "h-24 w-48"
                )}>
                    <Logo imageClassName={cn("transition-all duration-300", isCollapsed ? "h-8" : "h-20")} />
                </div>
                {!isCollapsed && (
                    <span className="mt-4 text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">University Panel</span>
                )}
            </div>

            {/* Navigation */}
            <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
                <div className="space-y-1">
                    {mainItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.href);
                        return (
                            <Link key={item.label} to={item.href}>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "w-full justify-start gap-4 h-12 transition-all group relative",
                                        isActive ? "bg-white/10 text-white shadow-lg" : "text-white/60 hover:text-white hover:bg-white/5",
                                        isCollapsed ? "px-0 justify-center" : "px-4"
                                    )}
                                >
                                    <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive && "text-primary-foreground")} />
                                    {!isCollapsed && <span className="font-medium">{item.label}</span>}
                                    {isActive && !isCollapsed && (
                                        <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full" />
                                    )}
                                </Button>
                            </Link>
                        );
                    })}
                </div>

                <div className="pt-6 border-t border-white/5 space-y-1">
                    {bottomItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link key={item.label} to={item.href}>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "w-full justify-start gap-4 h-11",
                                        isActive ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5",
                                        isCollapsed ? "px-0 justify-center" : "px-4"
                                    )}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {!isCollapsed && <span className="font-medium">{item.label}</span>}
                                </Button>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Logout */}
            <div className="p-3 border-t border-white/5 bg-black/10">
                <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className={cn(
                        "w-full justify-start gap-4 text-red-400 hover:text-red-300 hover:bg-red-500/10 h-12",
                        isCollapsed ? "px-0 justify-center" : "px-4"
                    )}
                >
                    <LogOut className="w-5 h-5" />
                    {!isCollapsed && <span className="font-medium">Sign Out</span>}
                </Button>
            </div>

            {/* Collapse Toggle */}
            <Button
                onClick={() => setIsCollapsed(!isCollapsed)}
                variant="secondary"
                size="icon"
                className="absolute -right-3 top-32 w-6 h-6 rounded-full border border-border shadow-md"
            >
                {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
            </Button>
        </div>
    );
}
