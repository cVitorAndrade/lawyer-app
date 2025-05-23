"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarRange,
  Command,
  FileStack,
  FileText,
  Frame,
  IdCard,
  KanbanSquare,
  LayoutDashboard,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LawyerService } from "@/service/lawyer.service";
import { useServerAction } from "zsa-react";
import { getLawyer } from "@/actions/lawyer/get-lawyer";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: false,
      items: [],
    },
    {
      title: "Casos",
      url: "/app/cases",
      icon: BriefcaseBusiness,
      isActive: false,
      items: [],
    },
    {
      title: "Documentos",
      url: "/app/documents",
      icon: FileStack,
      isActive: false,
      items: [],
    },
    {
      title: "Clientes",
      url: "/app/clients",
      icon: IdCard,
      isActive: false,
      items: [],
    },
    {
      title: "Tasks",
      url: "/app/tasks",
      icon: KanbanSquare,
      isActive: false,
      items: [],
    },
    {
      title: "Compromissos",
      url: "/app/appointments/month-view",
      icon: CalendarRange,
      isActive: false,
      items: [],
    },
    // {
    //   title: "Modelos",
    //   url: "#",
    //   icon: FileText,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    {
      title: "AI",
      url: "#",
      icon: BrainCircuit,
      items: [],
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

interface UserDetails {
  name: string;
  username: string;
  email: string;
  avatar: string;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userDetails, setUserDetails] = React.useState<UserDetails>({
    email: "",
    name: "",
    username: "",
    avatar: "",
  });

  const { execute: executeGetLawyer } = useServerAction(getLawyer);

  React.useEffect(() => {
    const onGetUserDetails = async () => {
      try {
        const [user] = await executeGetLawyer();
        if (!user) return;

        setUserDetails({
          username: user.username,
          avatar: user.avatar ?? "",
          email: user.email,
          name: user.name,
        });
      } catch (error) {
        console.log("AppSideBar - onGetUserDetails: ");
      }
    };

    onGetUserDetails();
  }, []);
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userDetails} />
      </SidebarFooter>
    </Sidebar>
  );
}
