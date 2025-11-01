import React from "react";
import type { Advocate } from "@repo/types";
import { TableHeader } from "../molecules/TableHeader";
import { TableRow } from "../molecules/TableRow";

export interface AdvocateTableProps {
  advocates: Advocate[];
}

/**
 * AdvocateTable component for displaying advocate data in a table
 *
 * @param advocates - Array of advocate data to display
 */
export const AdvocateTable: React.FC<AdvocateTableProps> = ({ advocates }) => {
  const headers = [
    "First Name",
    "Last Name",
    "City",
    "Degree",
    "Specialties",
    "Years of Experience",
    "Phone Number",
  ];

  return (
    <table className="w-full border-collapse">
      <TableHeader headers={headers} />
      <tbody>
        {advocates.map((advocate, index) => (
          <TableRow
            key={index}
            cells={[
              advocate.firstName,
              advocate.lastName,
              advocate.city,
              advocate.degree,
              <div key={`specialties-${index}`}>
                {advocate.specialties.map((s, i) => (
                  <div key={i}>{s}</div>
                ))}
              </div>,
              advocate.yearsOfExperience,
              advocate.phoneNumber,
            ]}
          />
        ))}
      </tbody>
    </table>
  );
};
