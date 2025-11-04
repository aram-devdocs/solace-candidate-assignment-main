import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PageSelector } from "./PageSelector";

const meta = {
  title: "Molecules/PageSelector",
  component: PageSelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const generateVisiblePages = (current: number, total: number): (number | "...")[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [1];

  if (current > 3) {
    pages.push("...");
  }

  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("...");
  }

  if (total > 1) {
    pages.push(total);
  }

  return pages;
};

export const Default: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const totalPages = 10;
    const totalItems = 250;

    return (
      <div className="w-full max-w-4xl">
        <PageSelector
          currentPage={currentPage}
          totalPages={totalPages}
          visiblePages={generateVisiblePages(currentPage, totalPages)}
          hasPrevious={currentPage > 1}
          hasNext={currentPage < totalPages}
          onPageChange={setCurrentPage}
          onFirstPage={() => setCurrentPage(1)}
          onLastPage={() => setCurrentPage(totalPages)}
          pageSize={pageSize}
          pageSizeOptions={[10, 25, 50, 100]}
          totalItems={totalItems}
          onPageSizeChange={setPageSize}
          deviceSize="desktop"
        />
      </div>
    );
  },
};

export const Mobile: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const totalPages = 10;
    const totalItems = 250;

    return (
      <div className="w-full max-w-sm">
        <PageSelector
          currentPage={currentPage}
          totalPages={totalPages}
          visiblePages={generateVisiblePages(currentPage, totalPages)}
          hasPrevious={currentPage > 1}
          hasNext={currentPage < totalPages}
          onPageChange={setCurrentPage}
          onFirstPage={() => setCurrentPage(1)}
          onLastPage={() => setCurrentPage(totalPages)}
          pageSize={pageSize}
          pageSizeOptions={[10, 25, 50, 100]}
          totalItems={totalItems}
          onPageSizeChange={setPageSize}
          deviceSize="mobile"
        />
      </div>
    );
  },
};

export const Tablet: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const totalPages = 10;
    const totalItems = 250;

    return (
      <div className="w-full max-w-2xl">
        <PageSelector
          currentPage={currentPage}
          totalPages={totalPages}
          visiblePages={generateVisiblePages(currentPage, totalPages)}
          hasPrevious={currentPage > 1}
          hasNext={currentPage < totalPages}
          onPageChange={setCurrentPage}
          onFirstPage={() => setCurrentPage(1)}
          onLastPage={() => setCurrentPage(totalPages)}
          pageSize={pageSize}
          pageSizeOptions={[10, 25, 50, 100]}
          totalItems={totalItems}
          onPageSizeChange={setPageSize}
          deviceSize="tablet"
        />
      </div>
    );
  },
};

export const VerticalOrientation: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const totalPages = 10;
    const totalItems = 250;

    return (
      <div className="w-full max-w-md">
        <PageSelector
          currentPage={currentPage}
          totalPages={totalPages}
          visiblePages={generateVisiblePages(currentPage, totalPages)}
          hasPrevious={currentPage > 1}
          hasNext={currentPage < totalPages}
          onPageChange={setCurrentPage}
          onFirstPage={() => setCurrentPage(1)}
          onLastPage={() => setCurrentPage(totalPages)}
          pageSize={pageSize}
          pageSizeOptions={[10, 25, 50, 100]}
          totalItems={totalItems}
          onPageSizeChange={setPageSize}
          deviceSize="desktop"
          orientation="vertical"
        />
      </div>
    );
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    visiblePages: [1, 2, 3, "...", 10],
    hasPrevious: false,
    hasNext: true,
    pageSize: 25,
    pageSizeOptions: [10, 25, 50, 100],
    totalItems: 250,
    deviceSize: "desktop",
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    visiblePages: [1, "...", 4, 5, 6, "...", 10],
    hasPrevious: true,
    hasNext: true,
    pageSize: 25,
    pageSizeOptions: [10, 25, 50, 100],
    totalItems: 250,
    deviceSize: "desktop",
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    visiblePages: [1, "...", 8, 9, 10],
    hasPrevious: true,
    hasNext: false,
    pageSize: 25,
    pageSizeOptions: [10, 25, 50, 100],
    totalItems: 250,
    deviceSize: "desktop",
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
    visiblePages: [1, 2, 3],
    hasPrevious: true,
    hasNext: true,
    pageSize: 25,
    pageSizeOptions: [10, 25, 50, 100],
    totalItems: 75,
    deviceSize: "desktop",
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    visiblePages: [1],
    hasPrevious: false,
    hasNext: false,
    pageSize: 25,
    pageSizeOptions: [10, 25, 50, 100],
    totalItems: 15,
    deviceSize: "desktop",
  },
};

export const LargeDataset: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const totalPages = 200;
    const totalItems = 10000;

    return (
      <div className="w-full max-w-4xl">
        <PageSelector
          currentPage={currentPage}
          totalPages={totalPages}
          visiblePages={generateVisiblePages(currentPage, totalPages)}
          hasPrevious={currentPage > 1}
          hasNext={currentPage < totalPages}
          onPageChange={setCurrentPage}
          onFirstPage={() => setCurrentPage(1)}
          onLastPage={() => setCurrentPage(totalPages)}
          pageSize={pageSize}
          pageSizeOptions={[25, 50, 100, 200]}
          totalItems={totalItems}
          onPageSizeChange={setPageSize}
          deviceSize="desktop"
        />
      </div>
    );
  },
};

export const CustomPageSizes: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
    visiblePages: [1, 2, 3, 4, 5],
    hasPrevious: false,
    hasNext: true,
    pageSize: 20,
    pageSizeOptions: [5, 10, 20, 50],
    totalItems: 100,
    deviceSize: "desktop",
  },
};
