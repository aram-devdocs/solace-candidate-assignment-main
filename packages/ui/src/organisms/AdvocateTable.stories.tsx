import type { Meta, StoryObj } from "@storybook/react";
import { AdvocateTable } from "./AdvocateTable";
import type { Advocate } from "@repo/types";

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
