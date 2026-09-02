"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CreditCardIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutAction } from "@/service/logout";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

const user = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  avatar: "/user-avatar.png",
  initials: "AL",
};

const userMenuItems = [
  {
    label: "Profile",
    icon: UserIcon,
    onSelect: () => console.log("[v0] profile"),
  },
  {
    label: "Billing",
    icon: CreditCardIcon,
    onSelect: () => console.log("[v0] billing"),
  },
  {
    label: "Settings",
    icon: SettingsIcon,
    onSelect: () => console.log("[v0] settings"),
  },
];

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Premium", href: "/premium" },
];

type UserProfile = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    profile: {
      id: string;
      name: string;
      email: string;
      activeStatus: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        userId: string;
        profilePhoto: string | null;
        bio: string | null;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
};

type NavbarProps = {
  user: UserProfile;
};

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async (action: string) => {
    if (action === "logout") {
      await logoutAction();
      toast.success("user logged out successfully");
      router.push('/')
    }
  };


  return (
    <header className="bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur ">
      <nav
        aria-label="Main"
        className="mx-auto flex justify-between h-16 w-full max-w-7xl items-center gap-4 px-4"
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold bg-primary p-1 rounded-sm tracking-tight"
        >
          NPF
        </Link>

     

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {
          user.success ? (
            <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="size-9 rounded-full p-0"
                aria-label="Open user menu"
              >
                <Avatar className="size-9">
                  <AvatarImage
                    src={
                      user.data?.profile.profile.profilePhoto || "/avatar.svg"
                    }
                    alt=""
                  />
                  <AvatarFallback>
                    {user.data?.profile.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">
                      {user.data?.profile.name}
                    </span>
                    <span className="text-muted-foreground text-xs font-normal">
                      {user.data?.profile.email}
                    </span>
                  </span>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {userMenuItems.map((item) => (
                  <DropdownMenuItem key={item.label} onClick={item.onSelect}>
                    <item.icon />
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={async () => {
                    await handleLogout("logout");
                  }}
                >
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation menu"
              >
                <MenuIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <DropdownMenuItem
                      key={link.href}
                      onSelect={() => router.push(link.href)}
                      className={cn(
                        isActive && "bg-accent text-accent-foreground",
                      )}
                    >
                      {link.label}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
          ) : <Link href={"/login"}>
            <Button variant={"secondary"} className="bg-primary">Login</Button>
          </Link>
        }
      </nav>
    </header>
  );
}
