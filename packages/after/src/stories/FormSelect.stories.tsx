import type { Meta, StoryObj } from "@storybook/react";
import { FormSelect } from "../components/forms/FormSelect";

const meta = {
  title: "Forms/FormSelect",
  component: FormSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "The label for the select." },
    error: { control: "text", description: "The error message to display." },
    helpText: { control: "text", description: "The help text to display." },
    required: {
      control: "boolean",
      description: "Whether the field is required.",
    },
    placeholder: { control: "text", description: "The placeholder option." },
    disabled: {
      control: "boolean",
      description: "Whether the select is disabled.",
    },
  },
} satisfies Meta<typeof FormSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: "user", label: "User" },
  { value: "moderator", label: "Moderator" },
  { value: "admin", label: "Admin" },
];

export const Default: Story = {
  args: {
    label: "Role",
    options: options,
    name: "role",
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: "Role",
    placeholder: "Select a role...",
    options: options,
    name: "role",
  },
};

export const WithError: Story = {
  args: {
    label: "Role",
    options: options,
    name: "role",
    error: "Please select a valid role.",
  },
};

export const Required: Story = {
  args: {
    label: "Status",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
    name: "status",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Role (Disabled)",
    options: options,
    disabled: true,
    value: "user",
  },
};
