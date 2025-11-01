import type { Meta, StoryObj } from "@storybook/react";
import { AdvocateListTemplate } from "./AdvocateListTemplate";
import type { Advocate } from "@repo/types";
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

const mockAdvocates: Advocate[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    city: "New York",
    degree: "MD" as const,
    specialties: ["Anxiety/Depression", "PTSD"],
    yearsOfExperience: 10,
    phoneNumber: 5550001,
    createdAt: null,
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    city: "Los Angeles",
    degree: "PhD" as const,
    specialties: ["LGBTQ Counseling", "Relationship issues"],
    yearsOfExperience: 8,
    phoneNumber: 5550002,
    createdAt: null,
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Johnson",
    city: "Chicago",
    degree: "MSW" as const,
    specialties: ["Addiction counseling", "Family therapy"],
    yearsOfExperience: 15,
    phoneNumber: 5550003,
    createdAt: null,
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
