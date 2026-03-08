import React, { useState } from "react";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { FormTextarea } from "./FormTextarea";
import type { Post } from "../../services/postService";

interface PostFormProps {
  data: Partial<Post>;
  onChange: (newData: Partial<Post>) => void;
  checkBusinessRules?: boolean;
}

export const PostForm: React.FC<PostFormProps> = ({
  data,
  onChange,
  checkBusinessRules = false,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "title") {
      if (value) {
        if (value.length < 5) {
          error = "제목은 5자 이상이어야 합니다";
        } else if (value.length > 100) {
          error = "제목은 100자 이하여야 합니다";
        }

        if (!error && checkBusinessRules) {
          const bannedWords = ["광고", "스팸", "홍보"];
          const hasBannedWord = bannedWords.some((word) =>
            value.includes(word),
          );
          if (hasBannedWord) {
            error = "제목에 금지된 단어가 포함되어 있습니다";
          }
        }
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (name: string, value: string) => {
    onChange({ ...data, [name]: value });
    validateField(name, value);
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <FormInput
        name="title"
        value={data.title || ""}
        onChange={(e) => handleChange("title", e.target.value)}
        label="제목"
        placeholder="게시글 제목을 입력하세요"
        required
        error={errors.title}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          name="author"
          value={data.author || ""}
          onChange={(e) => handleChange("author", e.target.value)}
          label="작성자"
          placeholder="작성자명"
          required
        />
        <FormSelect
          name="category"
          value={data.category || ""}
          onChange={(e) => handleChange("category", e.target.value)}
          options={[
            { value: "development", label: "Development" },
            { value: "design", label: "Design" },
            { value: "accessibility", label: "Accessibility" },
          ]}
          label="카테고리"
          placeholder="카테고리 선택"
        />
      </div>
      <FormTextarea
        name="content"
        value={data.content || ""}
        onChange={(e) => handleChange("content", e.target.value)}
        label="내용"
        placeholder="게시글 내용을 입력하세요"
        rows={6}
      />
    </div>
  );
};
