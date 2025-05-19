import { cookies } from "next/headers";
import ClientsHeader from "./components/clients-header";
import LawyerClientsSection from "./components/lawyer-clients-section";
import { ClientType } from "@/schemas/client";

export default async function Clients() {
  const allCookies = await cookies();
  const access_token = allCookies.get("access_token")?.value;

  const clientsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/client`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    }
  );

  const clients: ClientType[] = await clientsResponse.json();

  return (
    <div className="flex flex-col gap-4">
      <ClientsHeader />

      <LawyerClientsSection clients={clients} />
    </div>
  );
}
