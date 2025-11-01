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

export const Default: Story = {
  args: {
    advocates: mockAdvocates,
    searchTerm: "",
    onSearchChange: () => {},
    onResetSearch: () => {},
  },
  render: (args) => {
    const [searchTerm, setSearchTerm] = useState(args.searchTerm);
    return (
      <AdvocateListTemplate
        {...args}
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onResetSearch={() => setSearchTerm("")}
      />
    );
  },
};

export const Loading: Story = {
  args: {
    advocates: [],
    searchTerm: "",
    onSearchChange: () => {},
    onResetSearch: () => {},
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    advocates: [],
    searchTerm: "",
    onSearchChange: () => {},
    onResetSearch: () => {},
    error: "Failed to load advocates",
  },
};

export const WithSearch: Story = {
  args: {
    advocates: mockAdvocates.filter((a) => a.firstName.toLowerCase().includes("john")),
    searchTerm: "John",
    onSearchChange: () => {},
    onResetSearch: () => {},
  },
  render: (args) => {
    const [searchTerm, setSearchTerm] = useState(args.searchTerm);
    return (
      <AdvocateListTemplate
        {...args}
        advocates={mockAdvocates.filter((a) =>
          a.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onResetSearch={() => setSearchTerm("")}
      />
    );
  },
};
