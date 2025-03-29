import { ICase } from "@/interfaces/ICase";
import CasesMetrics from "./components/cases-metrics";
import CasesTableSection from "./components/cases-table-section";
import { cookies } from "next/headers";

export default async function Cases() {
  let lawyerCases: ICase[] = [];

  const allCookies = await cookies();
  const access_token = allCookies.get("access_token")?.value;

  try {
    const response = await fetch(`${process.env.API_URL}/case`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    lawyerCases = await response.json();
  } catch (error) {
    console.log("Cases: get lawyer cases", error);
  }

  return (
    <div>
      <CasesMetrics />
      <CasesTableSection lawyerCases={lawyerCases} />
    </div>
  );
}
