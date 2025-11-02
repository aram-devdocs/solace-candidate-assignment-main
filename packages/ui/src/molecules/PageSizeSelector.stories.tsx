import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PageSizeSelector } from "./PageSizeSelector";

const meta = {
  title: "Molecules/PageSizeSelector",
  component: PageSizeSelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PageSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [pageSize, setPageSize] = useState(25);
    return (
      <PageSizeSelector
        pageSize={pageSize}
        options={[10, 25, 50, 100]}
        totalItems={247}
        onPageSizeChange={setPageSize}
      />
    );
  },
};

export const SmallDataset: Story = {
  render: () => {
    const [pageSize, setPageSize] = useState(10);
    return (
      <PageSizeSelector
        pageSize={pageSize}
        options={[5, 10, 20]}
        totalItems={42}
        onPageSizeChange={setPageSize}
      />
    );
  },
};

export const LargeDataset: Story = {
  render: () => {
    const [pageSize, setPageSize] = useState(100);
    return (
      <PageSizeSelector
        pageSize={pageSize}
        options={[25, 50, 100, 200]}
        totalItems={15432}
        onPageSizeChange={setPageSize}
      />
    );
  },
};

export const CustomLabel: Story = {
  render: () => {
    const [pageSize, setPageSize] = useState(25);
    return (
      <PageSizeSelector
        pageSize={pageSize}
        options={[10, 25, 50, 100]}
        totalItems={247}
        onPageSizeChange={setPageSize}
        label="Display"
      />
    );
  },
};

export const SingleOption: Story = {
  render: () => {
    const [pageSize, setPageSize] = useState(25);
    return (
      <PageSizeSelector
        pageSize={pageSize}
        options={[25]}
        totalItems={18}
        onPageSizeChange={setPageSize}
      />
    );
  },
};
