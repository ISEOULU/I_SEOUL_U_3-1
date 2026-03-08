import React, { useState } from "react";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import type { User } from "../../services/userService";

interface UserFormProps {
  data: Partial<User>;
  onChange: (newData: Partial<User>) => void;
  checkBusinessRules?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
  data,
  onChange,
  checkBusinessRules = false,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "username") {
      if (value) {
        if (value.length < 3) {
          error = "사용자명은 3자 이상이어야 합니다";
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          error = "영문, 숫자, 언더스코어만 사용 가능합니다";
        } else if (value.length > 20) {
          error = "사용자명은 20자 이하여야 합니다";
        }

        if (!error && checkBusinessRules) {
          const reservedWords = ["admin", "root", "system", "administrator"];
          if (reservedWords.includes(value.toLowerCase())) {
            error = "예약된 사용자명입니다";
          }
        }
      }
    } else if (name === "email") {
      if (value) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "올바른 이메일 형식이 아닙니다";
        } else if (checkBusinessRules) {
          if (
            !value.endsWith("@company.com") &&
            !value.endsWith("@example.com")
          ) {
            error =
              "회사 이메일(@company.com 또는 @example.com)만 사용 가능합니다";
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
        name="username"
        value={data.username || ""}
        onChange={(e) => handleChange("username", e.target.value)}
        label="사용자명"
        placeholder="사용자명을 입력하세요"
        required
        error={errors.username}
      />
      <FormInput
        name="email"
        value={data.email || ""}
        onChange={(e) => handleChange("email", e.target.value)}
        label="이메일"
        placeholder="이메일을 입력하세요"
        type="email"
        required
        error={errors.email}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormSelect
          name="role"
          value={data.role || "user"}
          onChange={(e) => handleChange("role", e.target.value)}
          options={[
            { value: "user", label: "사용자" },
            { value: "moderator", label: "운영자" },
            { value: "admin", label: "관리자" },
          ]}
          label="역할"
        />
        <FormSelect
          name="status"
          value={data.status || "active"}
          onChange={(e) => handleChange("status", e.target.value)}
          options={[
            { value: "active", label: "활성" },
            { value: "inactive", label: "비활성" },
            { value: "suspended", label: "정지" },
          ]}
          label="상태"
        />
      </div>
    </div>
  );
};
