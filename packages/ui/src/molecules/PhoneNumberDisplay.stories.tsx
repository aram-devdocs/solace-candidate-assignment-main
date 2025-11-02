// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import { PhoneNumberDisplay } from "./PhoneNumberDisplay";

const meta: Meta<typeof PhoneNumberDisplay> = {
  title: "Molecules/PhoneNumberDisplay",
  component: PhoneNumberDisplay,
  tags: ["autodocs"],
  argTypes: {
    phoneNumber: {
      control: "text",
      description: "The formatted phone number to display",
    },
    areaCode: {
      control: "text",
      description: "The area code portion",
    },
    onAreaCodeClick: {
      action: "areaCodeClicked",
      description: "Callback when area code is clicked",
    },
    clickable: {
      control: "boolean",
      description: "Whether the area code is clickable",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PhoneNumberDisplay>;

export const Default: Story = {
  args: {
    phoneNumber: "(555) 789-0123",
    areaCode: "555",
    clickable: false,
  },
};

export const Clickable: Story = {
  args: {
    phoneNumber: "(555) 789-0123",
    areaCode: "555",
    clickable: true,
    onAreaCodeClick: (areaCode: string) => {
      console.log("Filter by area code:", areaCode);
    },
  },
};

export const DifferentAreaCodes: Story = {
  render: () => (
    <div className="gap-md flex flex-col">
      <PhoneNumberDisplay phoneNumber="(212) 456-7890" areaCode="212" clickable={true} />
      <PhoneNumberDisplay phoneNumber="(415) 123-4567" areaCode="415" clickable={true} />
      <PhoneNumberDisplay phoneNumber="(718) 987-6543" areaCode="718" clickable={true} />
    </div>
  ),
};

export const NonClickable: Story = {
  args: {
    phoneNumber: "(555) 789-0123",
    areaCode: "555",
    clickable: false,
  },
};
