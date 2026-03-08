import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../components/ui/badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "success", "warning", "info"],
      description: "The visual style of the badge.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the badge.",
    },
    pill: {
      control: "boolean",
      description: "Whether the badge should be fully rounded.",
    },
    children: {
      control: "text",
      description: "The content of the badge.",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
    children: "Secondary / Archived",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    size: "md",
    children: "Danger / Rejected",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    size: "md",
    children: "Success / Published",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    size: "md",
    children: "Warning / Draft",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    size: "md",
    children: "Info / Pending",
  },
};

export const Pill: Story = {
  args: {
    variant: "primary",
    size: "md",
    pill: true,
    children: "Pill Shape",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};
