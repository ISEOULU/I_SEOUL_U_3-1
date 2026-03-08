import type { Meta, StoryObj } from "@storybook/react";
import { FormInput } from "../components/forms/FormInput";

const meta = {
  title: "Forms/FormInput",
  component: FormInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "The label for the input." },
    error: { control: "text", description: "The error message to display." },
    helpText: { control: "text", description: "The help text to display." },
    required: {
      control: "boolean",
      description: "Whether the field is required.",
    },
    placeholder: { control: "text", description: "The placeholder text." },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled.",
    },
  },
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    name: "username",
  },
};

export const WithError: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    name: "username",
    error: "Username is already taken.",
  },
};

export const WithHelpText: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    name: "password",
    helpText: "Must be at least 8 characters.",
    type: "password",
  },
};

export const Required: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    name: "email",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Readonly Field",
    value: "Cannot change this",
    disabled: true,
  },
};
