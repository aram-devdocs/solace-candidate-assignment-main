import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "./Pagination";

const meta = {
  title: "Molecules/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;
    const visiblePages = [1, 2, 3, 4, 5, "...", 10];

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        visiblePages={visiblePages}
        hasPrevious={false}
        hasNext={true}
        onPageChange={setCurrentPage}
        onFirstPage={() => setCurrentPage(1)}
        onLastPage={() => setCurrentPage(totalPages)}
        deviceSize="desktop"
      />
    );
  },
};

export const MiddlePage: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(5);
    const totalPages = 10;
    const visiblePages = [1, "...", 4, 5, 6, "...", 10];

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        visiblePages={visiblePages}
        hasPrevious={true}
        hasNext={true}
        onPageChange={setCurrentPage}
        onFirstPage={() => setCurrentPage(1)}
        onLastPage={() => setCurrentPage(totalPages)}
        deviceSize="desktop"
      />
    );
  },
};

export const LastPage: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(10);
    const totalPages = 10;
    const visiblePages = [1, "...", 6, 7, 8, 9, 10];

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        visiblePages={visiblePages}
        hasPrevious={true}
        hasNext={false}
        onPageChange={setCurrentPage}
        onFirstPage={() => setCurrentPage(1)}
        onLastPage={() => setCurrentPage(totalPages)}
        deviceSize="desktop"
      />
    );
  },
};

export const FewPages: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(2);
    const totalPages = 3;
    const visiblePages = [1, 2, 3];

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        visiblePages={visiblePages}
        hasPrevious={true}
        hasNext={true}
        onPageChange={setCurrentPage}
        onFirstPage={() => setCurrentPage(1)}
        onLastPage={() => setCurrentPage(totalPages)}
        deviceSize="desktop"
      />
    );
  },
};

export const MobileView: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(5);
    const totalPages = 10;
    const visiblePages = [1, "...", 4, 5, 6, "...", 10];

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        visiblePages={visiblePages}
        hasPrevious={true}
        hasNext={true}
        onPageChange={setCurrentPage}
        onFirstPage={() => setCurrentPage(1)}
        onLastPage={() => setCurrentPage(totalPages)}
        deviceSize="mobile"
      />
    );
  },
};

export const TabletView: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(5);
    const totalPages = 10;
    const visiblePages = [1, "...", 4, 5, 6, "...", 10];

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        visiblePages={visiblePages}
        hasPrevious={true}
        hasNext={true}
        onPageChange={setCurrentPage}
        onFirstPage={() => setCurrentPage(1)}
        onLastPage={() => setCurrentPage(totalPages)}
        deviceSize="tablet"
      />
    );
  },
};
