import type { Meta, StoryObj } from "@storybook/react";
import { AdvocateListTemplate } from "./AdvocateListTemplate";
import type { AdvocateWithRelations } from "@repo/types";
import { useState } from "react";

const meta = {
  title: "Templates/AdvocateListTemplate",
  component: AdvocateListTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AdvocateListTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockAdvocates: AdvocateWithRelations[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    cityId: 1,
    degreeId: 1,
    yearsOfExperience: 10,
    phoneNumber: "2125550001",
    createdAt: new Date(),
    city: { id: 1, name: "New York" },
    degree: { id: 1, code: "MD" as const },
    advocateSpecialties: [
      { specialty: { id: 1, name: "Anxiety/Depression" } },
      { specialty: { id: 2, name: "PTSD" } },
    ],
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    cityId: 2,
    degreeId: 2,
    yearsOfExperience: 8,
    phoneNumber: "3105550002",
    createdAt: new Date(),
    city: { id: 2, name: "Los Angeles" },
    degree: { id: 2, code: "PhD" as const },
    advocateSpecialties: [
      { specialty: { id: 3, name: "LGBTQ Counseling" } },
      { specialty: { id: 4, name: "Relationship issues" } },
    ],
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Johnson",
    cityId: 3,
    degreeId: 3,
    yearsOfExperience: 15,
    phoneNumber: "3125550003",
    createdAt: new Date(),
    city: { id: 3, name: "Chicago" },
    degree: { id: 3, code: "MSW" as const },
    advocateSpecialties: [
      { specialty: { id: 5, name: "Addiction counseling" } },
      { specialty: { id: 6, name: "Family therapy" } },
    ],
  },
];

function DefaultWrapper({ initialSearchTerm = "" }: { initialSearchTerm?: string }) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  return (
    <AdvocateListTemplate
      advocates={mockAdvocates}
      searchTerm={searchTerm}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      onResetSearch={() => setSearchTerm("")}
      deviceSize="desktop"
    />
  );
}

export const Default: Story = {
  args: {
    advocates: mockAdvocates,
    searchTerm: "",
    onSearchChange: () => {},
    onResetSearch: () => {},
    deviceSize: "desktop" as const,
  },
  render: () => <DefaultWrapper />,
};

export const Loading: Story = {
  args: {
    advocates: [],
    searchTerm: "",
    onSearchChange: () => {},
    onResetSearch: () => {},
    isLoading: true,
    deviceSize: "desktop",
  },
};

export const Error: Story = {
  args: {
    advocates: [],
    searchTerm: "",
    onSearchChange: () => {},
    onResetSearch: () => {},
    error: "Failed to load advocates",
    deviceSize: "desktop",
  },
};

function WithSearchWrapper() {
  const [searchTerm, setSearchTerm] = useState("John");
  return (
    <AdvocateListTemplate
      advocates={mockAdvocates.filter((a) =>
        a.firstName.toLowerCase().includes(searchTerm.toLowerCase())
      )}
      searchTerm={searchTerm}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      onResetSearch={() => setSearchTerm("")}
      deviceSize="desktop"
    />
  );
}

export const WithSearch: Story = {
  args: {
    advocates: mockAdvocates.filter((a) => a.firstName.toLowerCase().includes("john")),
    searchTerm: "John",
    onSearchChange: () => {},
    onResetSearch: () => {},
    deviceSize: "desktop" as const,
  },
  render: () => <WithSearchWrapper />,
};
