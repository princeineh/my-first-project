"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Trophy, User, ShoppingBag, BookOpen, ClipboardList, Star, Mic2, Store, Users } from "lucide-react";

type Role = "player" | "coach" | "referee" | "scout" | "media" | "vendor" | "manager" | "fan";

const navByRole: Record<Role, { href: string; icon: React.ComponentType<{ size: number }>; label: string }[]> = {
  player: [
    { href: "/",         icon: Home,          label: "Home"     },
    { href: "/district", icon: Map,           label: "District" },
    { href: "/season",   icon: Trophy,        label: "Season"   },
    { href: "/profile",  icon: User,          label: "Profile"  },
    { href: "/kit",      icon: ShoppingBag,   label: "Kit"      },
  ],
  coach: [
    { href: "/",                   icon: Home,          label: "Home"    },
    { href: "/coach",              icon: ClipboardList, label: "Squad"   },
    { href: "/clubs/manutd/vote",  icon: Star,          label: "Vote"    },
    { href: "/season",             icon: Trophy,        label: "Season"  },
    { href: "/profile",            icon: User,          label: "Profile" },
  ],
  referee: [
    { href: "/",        icon: Home,     label: "Home"    },
    { href: "/referee", icon: BookOpen, label: "Matches" },
    { href: "/season",  icon: Trophy,   label: "Season"  },
    { href: "/profile", icon: User,     label: "Profile" },
  ],
  scout: [
    { href: "/",                  icon: Home,          label: "Home"    },
    { href: "/scout",             icon: Star,          label: "Academy" },
    { href: "/clubs/manutd/vote", icon: Users,         label: "Vote"    },
    { href: "/season",            icon: Trophy,        label: "Season"  },
    { href: "/profile",           icon: User,          label: "Profile" },
  ],
  media: [
    { href: "/",          icon: Home,          label: "Home"    },
    { href: "/media",     icon: Mic2,          label: "Buzz"    },
    { href: "/governance",icon: BookOpen,      label: "Gov"     },
    { href: "/reports",   icon: ClipboardList, label: "Reports" },
    { href: "/profile",   icon: User,          label: "Profile" },
  ],
  vendor: [
    { href: "/",                icon: Home,        label: "Home"    },
    { href: "/vendor-dashboard",icon: Store,       label: "Shop"    },
    { href: "/vendors",         icon: ShoppingBag, label: "Market"  },
    { href: "/reports",         icon: BookOpen,    label: "Reports" },
    { href: "/profile",         icon: User,        label: "Profile" },
  ],
  manager: [
    { href: "/",          icon: Home,          label: "Home"    },
    { href: "/manager",   icon: ClipboardList, label: "Manage"  },
    { href: "/governance",icon: BookOpen,      label: "Finance" },
    { href: "/reports",   icon: Star,          label: "Reports" },
    { href: "/profile",   icon: User,          label: "Profile" },
  ],
  fan: [
    { href: "/",         icon: Home,     label: "Home"    },
    { href: "/district", icon: Map,      label: "District"},
    { href: "/season",   icon: Trophy,   label: "Season"  },
    { href: "/reports",  icon: BookOpen, label: "Reports" },
    { href: "/profile",  icon: User,     label: "Profile" },
  ],
};

export default function BottomNav({ role }: { role?: Role }) {
  const path = usePathname();
  const tabs = role ? (navByRole[role] ?? navByRole.player) : navByRole.player;

  return (
    <nav style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: "var(--surface)", borderTop: "1px solid var(--border)",
      display: "flex", zIndex: 100, paddingBottom: "env(safe-area-inset-bottom)",
    }}>
      {tabs.map(({ href, icon: Icon, label }) => {
        const active = path === href;
        return (
          <Link key={href + label} href={href} style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "10px 0 8px",
            color: active ? "var(--accent)" : "var(--muted)",
            textDecoration: "none", fontSize: 10, gap: 4,
            transition: "color 0.2s",
          }}>
            <Icon size={20} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
