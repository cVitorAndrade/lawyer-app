import { cookies } from "next/headers";
import CaseFilesSection from "./case-files-section";
import CaseDetailsSection from "./case-details-section";
import { ICaseFile } from "@/interfaces/ICaseFile";
import { ICase } from "@/interfaces/ICase";

export default async function CaseDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const allCookies = await cookies();
  const access_token = allCookies.get("access_token")?.value;

  const caseFilesResponse = await fetch(
    `${process.env.API_URL}/case-file/case/${id}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    }
  );

  const caseDetailsResponse = await fetch(`${process.env.API_URL}/case/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-store",
  });

  const [caseFiles, caseDetails]: [ICaseFile[], ICase] = await Promise.all([
    caseFilesResponse.json(),
    caseDetailsResponse.json(),
  ]);
  
  return (
    <div className="flex flex-col gap-4">
      {/* <div className="flex flex-col gap-4 rounded-lg py-4 bg-white">
        <div className="flex flex-col gap-1">
          <h3 className="font-medium">Atividades</h3>
          <p className="text-neutral-500">
            Linha do tempo das atividades que ocorreram nesse caso
          </p>
        </div>

        <div className="border-y py-4">
          <div className="pl-4">
            <TimelineEvent.Root>
              <TimelineEvent.Header>
                <TimelineEvent.Icon icon={MessageSquareText} />
                <TimelineEvent.Title
                  actor="Carter Bator"
                  action="Upload 3 file in"
                  target="Mobile Flow Design"
                />

                <TimelineEvent.CreatedAt createdAt="1hr Ago" />
              </TimelineEvent.Header>
              <TimelineEvent.Content></TimelineEvent.Content>
            </TimelineEvent.Root>

            <TimelineEvent.Root>
              <TimelineEvent.Header>
                <TimelineEvent.Icon icon={Upload} />
                <TimelineEvent.Title
                  actor="Carter Bator"
                  action="Upload 3 file in"
                  target="Mobile Flow Design"
                />

                <TimelineEvent.CreatedAt createdAt="1hr Ago" />
              </TimelineEvent.Header>
              <TimelineEvent.Content></TimelineEvent.Content>
            </TimelineEvent.Root>
            <TimelineEvent.Root>
              <TimelineEvent.Header>
                <TimelineEvent.Icon icon={MessageSquareText} />
                <TimelineEvent.Title
                  actor="Carter Bator"
                  action="Upload 3 file in"
                  target="Mobile Flow Design"
                />

                <TimelineEvent.CreatedAt createdAt="1hr Ago" />
              </TimelineEvent.Header>
              <TimelineEvent.Content></TimelineEvent.Content>
            </TimelineEvent.Root>

            <TimelineEvent.Root>
              <TimelineEvent.Header>
                <TimelineEvent.Icon icon={Upload} />
                <TimelineEvent.Title
                  actor="Carter Bator"
                  action="Upload 3 file in"
                  target="Mobile Flow Design"
                />

                <TimelineEvent.CreatedAt createdAt="1hr Ago" />
              </TimelineEvent.Header>
              <TimelineEvent.Content></TimelineEvent.Content>
            </TimelineEvent.Root>
            <TimelineEvent.Root>
              <TimelineEvent.Header>
                <TimelineEvent.Icon icon={MessageSquareText} />
                <TimelineEvent.Title
                  actor="Carter Bator"
                  action="Upload 3 file in"
                  target="Mobile Flow Design"
                />

                <TimelineEvent.CreatedAt createdAt="1hr Ago" />
              </TimelineEvent.Header>
              <TimelineEvent.Content></TimelineEvent.Content>
            </TimelineEvent.Root>

            <TimelineEvent.Root>
              <TimelineEvent.Header>
                <TimelineEvent.Icon icon={Check} />
                <TimelineEvent.Title
                  actor="Carter Bator"
                  action="Upload 3 file in"
                  target="Mobile Flow Design"
                />

                <TimelineEvent.CreatedAt createdAt="1hr Ago" />
              </TimelineEvent.Header>
            </TimelineEvent.Root>
          </div>
        </div>
      </div> */}

      {/* Clients Section */}
      <CaseDetailsSection caseDetails={caseDetails} />

      {/* Files Section */}
      <CaseFilesSection caseFiles={caseFiles} caseId={id} />
    </div>
  );
}
