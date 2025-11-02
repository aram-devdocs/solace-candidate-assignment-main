// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "./StatusBadge";

const meta: Meta<typeof StatusBadge> = {
  title: "Atoms/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
  argTypes: {
    displayedCount: {
      control: { type: "number", min: 0 },
      description: "Current count of displayed items",
    },
    totalCount: {
      control: { type: "number", min: 0 },
      description: "Total count of all items (from server, accurate)",
    },
    loadedCount: {
      control: { type: "number", min: 0 },
      description: "Count of items currently loaded in client cache",
    },
    itemLabel: {
      control: "text",
      description: "Label for the items being counted",
    },
    isFiltered: {
      control: "boolean",
      description: "Whether filters are currently applied",
    },
    isBackgroundFetching: {
      control: "boolean",
      description: "Whether background fetching is in progress",
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Default: Story = {
  args: {
    displayedCount: 25,
    totalCount: 10000,
    loadedCount: 500,
    itemLabel: "advocates",
    isFiltered: false,
    isBackgroundFetching: false,
  },
};

export const Filtered: Story = {
  args: {
    displayedCount: 10,
    totalCount: 127,
    loadedCount: 500,
    itemLabel: "advocates",
    isFiltered: true,
    isBackgroundFetching: false,
  },
};

export const BackgroundFetching: Story = {
  args: {
    displayedCount: 3,
    totalCount: 10000,
    loadedCount: 500,
    itemLabel: "advocates",
    isFiltered: true,
    isBackgroundFetching: true,
  },
};

export const ShowingAll: Story = {
  args: {
    displayedCount: 150,
    totalCount: 150,
    loadedCount: 150,
    itemLabel: "advocates",
    isFiltered: false,
    isBackgroundFetching: false,
  },
};

export const ShowingAllFiltered: Story = {
  args: {
    displayedCount: 45,
    totalCount: 45,
    loadedCount: 500,
    itemLabel: "advocates",
    isFiltered: true,
    isBackgroundFetching: false,
  },
};

export const LargeNumbers: Story = {
  args: {
    displayedCount: 250,
    totalCount: 12543,
    loadedCount: 500,
    itemLabel: "advocates",
    isFiltered: false,
    isBackgroundFetching: false,
  },
};

export const CustomLabel: Story = {
  args: {
    displayedCount: 5,
    totalCount: 20,
    loadedCount: 100,
    itemLabel: "results",
    isFiltered: true,
    isBackgroundFetching: false,
  },
};

export const SingleItem: Story = {
  args: {
    displayedCount: 1,
    totalCount: 1,
    loadedCount: 1,
    itemLabel: "advocate",
    isFiltered: false,
    isBackgroundFetching: false,
  },
};
