import ClientPersonalInfosSection from "./components/client-personal-infos-section";
import ClientDetailedInfosSection from "./components/client-detailed-infos-section";
import { cookies } from "next/headers";
import { ClientType } from "@/schemas/client";

export default async function ClientDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const allCookies = await cookies();
  const access_token = allCookies.get("access_token")?.value;

  const clientResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/client/${id}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    }
  );

  const client: ClientType = await clientResponse.json();

  return (
    <div className="grid grid-cols-4 gap-4 h-full">
      <ClientPersonalInfosSection />

      <ClientDetailedInfosSection client={client} />
    </div>
  );
}
