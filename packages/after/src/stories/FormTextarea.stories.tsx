import type { Meta, StoryObj } from "@storybook/react";
import { FormTextarea } from "../components/forms/FormTextarea";

const meta = {
  title: "Forms/FormTextarea",
  component: FormTextarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "The label for the textarea." },
    error: { control: "text", description: "The error message to display." },
    helpText: { control: "text", description: "The help text to display." },
    required: {
      control: "boolean",
      description: "Whether the field is required.",
    },
    placeholder: { control: "text", description: "The placeholder text." },
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled.",
    },
    rows: { control: "number", description: "The number of rows." },
  },
} satisfies Meta<typeof FormTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Description",
    placeholder: "Enter a description",
    name: "description",
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself",
    name: "bio",
    error: "Bio is too short.",
    rows: 3,
  },
};

export const Required: Story = {
  args: {
    label: "Comments",
    placeholder: "Leave a comment",
    name: "comments",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Note (Disabled)",
    value: "This note cannot be edited.",
    disabled: true,
  },
};
