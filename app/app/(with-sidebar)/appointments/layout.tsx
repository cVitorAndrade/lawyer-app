import { CalendarProvider } from "@/app/app/(with-sidebar)/appointments/contexts/calendar-context";

import { ReactNode } from "react";
import { getEvents, getUsers } from "./requests";

const events = await getEvents();
const users = await getUsers();

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <CalendarProvider users={users} events={events}>
      {children}
    </CalendarProvider>
  );
}
