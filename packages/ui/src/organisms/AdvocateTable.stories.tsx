import type { Meta, StoryObj } from "@storybook/react";
import { AdvocateTable } from "./AdvocateTable";
import type { AdvocateWithRelations } from "@repo/types";

const meta = {
  title: "Organisms/AdvocateTable",
  component: AdvocateTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AdvocateTable>;

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

const generateManyAdvocates = (count: number): AdvocateWithRelations[] => {
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia"];
  const degrees = ["MD", "PhD", "MSW", "LCSW", "PsyD"] as const;
  const specialties = [
    "Anxiety/Depression",
    "PTSD",
    "LGBTQ Counseling",
    "Relationship issues",
    "Addiction counseling",
    "Family therapy",
    "Child counseling",
    "Grief counseling",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    firstName: `FirstName${i + 1}`,
    lastName: `LastName${i + 1}`,
    cityId: (i % cities.length) + 1,
    degreeId: (i % degrees.length) + 1,
    yearsOfExperience: (i % 20) + 1,
    phoneNumber: `${212 + i}5550${String(i).padStart(3, "0")}`,
    createdAt: new Date(),
    city: { id: (i % cities.length) + 1, name: cities[i % cities.length] },
    degree: { id: (i % degrees.length) + 1, code: degrees[i % degrees.length] },
    advocateSpecialties: [
      {
        specialty: { id: (i % specialties.length) + 1, name: specialties[i % specialties.length] },
      },
    ],
  }));
};

export const Default: Story = {
  args: {
    advocates: mockAdvocates,
    deviceSize: "desktop",
  },
};

export const SingleAdvocate: Story = {
  args: {
    advocates: [mockAdvocates[0]],
    deviceSize: "desktop",
  },
};

export const Empty: Story = {
  args: {
    advocates: [],
    deviceSize: "desktop",
  },
};

export const MobileView: Story = {
  args: {
    advocates: mockAdvocates,
    deviceSize: "mobile",
  },
};

export const TabletView: Story = {
  args: {
    advocates: mockAdvocates,
    deviceSize: "tablet",
  },
};

export const WithScrolling: Story = {
  args: {
    advocates: generateManyAdvocates(50),
    deviceSize: "desktop",
    pagination: {
      currentPage: 1,
      totalPages: 5,
      visiblePages: [1, 2, 3, "...", 5],
      hasPrevious: false,
      hasNext: true,
      onPageChange: () => {},
      onFirstPage: () => {},
      onLastPage: () => {},
    },
    pageSize: {
      current: 50,
      options: [10, 25, 50, 100],
      totalItems: 250,
      onPageSizeChange: () => {},
    },
  },
};
