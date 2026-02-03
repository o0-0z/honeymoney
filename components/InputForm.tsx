"use client";

import { useState } from "react";
import { UnemploymentBenefitInput } from "@/utils/calc";

interface InputFormProps {
  onSubmit: (input: UnemploymentBenefitInput) => void;
}

export function InputForm({ onSubmit }: InputFormProps) {
  const [formData, setFormData] = useState({
    monthlySalary: 0,
    age: 0,
    serviceYears: 0,
    serviceMonths: 0,
    isInvoluntary: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-lg p-8 text-center">
      {/* 월급 입력 */}
      <div className="text-center">
        <label className="block text-lg font-semibold text-gray-800 mb-2 text-center">
          세전 월급
        </label>
        <div className="relative w-full">
          <input
            type="number"
            name="monthlySalary"
            value={formData.monthlySalary}
            onChange={handleChange}
            min="1000000"
            step="100000"
            className="w-full px-4 py-3 pr-3 border-2 border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg text-center"
            placeholder="0"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">원</span>
        </div>
      </div>

      {/* 나이 입력 */}
      <div className="text-center">
        <label className="block text-lg font-semibold text-gray-800 mb-2 text-center">
          나이
        </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          min="18"
          max="100"
          className="w-full px-4 pr-3 py-3 border-2 border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg text-center"
          placeholder="35"
        />
      </div>

      {/* 고용보험 가입기간 */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="text-center">
          <label className="block text-lg font-semibold text-gray-800 mb-2 text-center">
            가입기간 (년)
          </label>
          <input
            type="number"
            name="serviceYears"
            value={formData.serviceYears}
            onChange={handleChange}
            min="0"
            max="50"
            className="w-full px-4 pr-4 py-3 border-2 border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg text-center"
            placeholder="5"
          />
        </div>
        <div className="text-center">
          <label className="block text-lg font-semibold text-gray-800 mb-2 text-center">
            가입기간 (개월)
          </label>
          <input
            type="number"
            name="serviceMonths"
            value={formData.serviceMonths}
            onChange={handleChange}
            min="0"
            max="11"
            className="w-full px-4 pr-4 py-3 border-2 border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg text-center"
            placeholder="0"
          />
        </div>
      </div>

      {/* 퇴사 사유 */}
      <div className="bg-yellow-50 p-4 rounded-lg text-center">
        <label className="flex items-center justify-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="isInvoluntary"
            checked={formData.isInvoluntary}
            onChange={handleChange}
            className="w-5 h-5 accent-yellow-500 cursor-pointer"
          />
          <span className="text-lg font-semibold text-gray-800 text-center">
            비자발적 퇴사 <br />(권고사직, 회사 폐업 등)
          </span>
        </label>
        <p className="text-sm text-red-600 font-semibold mt-2 text-center">
          체크하지 않으면 자발적 퇴사로 간주됩니다.
        </p>
      </div>

      {/* 제출 버튼 */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-4 px-6 rounded-lg text-xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
      >
        🍯 꿀 계산하기
      </button>
    </form>
  );
}
