import { cookies } from "next/headers";
import CaseFilesSection from "./case-files-section";
import CaseDetailsSection from "./case-details-section";
import { ICaseFile } from "@/interfaces/ICaseFile";
import { ICase } from "@/interfaces/ICase";
import CaseTimeLineSection from "./case-time-line-section";
import { CalendarProvider } from "@/app/app/(with-sidebar)/appointments/contexts/calendar-context";
import { getEvents, getUsers } from "../../appointments/requests";
import { ClientContainer } from "../../appointments/components/client-container";

export default async function CaseDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const allCookies = await cookies();
  const access_token = allCookies.get("access_token")?.value;

  const caseFilesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/case-file/case/${id}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    }
  );

  const caseDetailsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/case/${id}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    }
  );

  const [caseFiles, caseDetails]: [ICaseFile[], ICase] = await Promise.all([
    caseFilesResponse.json(),
    caseDetailsResponse.json(),
  ]);

  const events = await getEvents();
  const users = await getUsers();

  return (
    <div className="flex flex-col gap-4">
      {/* Clients Section */}
      <CaseDetailsSection caseDetails={caseDetails} />

      {/* Case Time line */}
      <CaseTimeLineSection />

      {/* Files Section */}
      <CaseFilesSection caseFiles={caseFiles} caseId={id} />
      <CalendarProvider users={users} events={events}>
        <ClientContainer view="month" />
      </CalendarProvider>
    </div>
  );
}
