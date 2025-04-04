import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "./components/sidebar-nav"

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/app/profile",
  },
  {
    title: "Account",
    href: "/app/profile/account",
  },
  {
    title: "Appearance",
    href: "/app/profile/appearance",
  },
  {
    title: "Notifications",
    href: "/app/profile/notifications",
  },
  {
    title: "Display",
    href: "/app/profile/display",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}