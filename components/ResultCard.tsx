"use client";

import { UnemploymentBenefitResult, formatCurrency } from "@/utils/calc";

interface ResultCardProps {
  result: UnemploymentBenefitResult;
  onReset: () => void;
}

export function ResultCard({ result, onReset }: ResultCardProps) {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow-lg p-8 space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        계산 결과 🍯
      </h2>

      {/* 결과 카드들 */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* 1일 실업급여 */}
        <div className="bg-white rounded-lg shadow p-6 text-center border-2 border-yellow-300">
          <p className="text-gray-600 font-semibold mb-2">1일 실업급여</p>
          <p className="text-3xl font-bold text-yellow-600 mb-1">
            {formatCurrency(result.dailyBenefit)}
          </p>
          <p className="text-xs text-gray-500">기준: {formatCurrency(result.averageWage)} × 60%</p>
        </div>

        {/* 총 지급일수 */}
        <div className="bg-white rounded-lg shadow p-6 text-center border-2 border-yellow-300">
          <p className="text-gray-600 font-semibold mb-2">총 지급일수</p>
          <p className="text-3xl font-bold text-yellow-600">
            {result.totalDays}
            <span className="text-lg ml-1">일</span>
          </p>
          <p className="text-xs text-gray-500">연령 + 가입기간 기준</p>
        </div>

        {/* 총 예상 지급액 */}
        <div className="bg-white rounded-lg shadow p-6 text-center border-4 border-yellow-500">
          <p className="text-gray-600 font-semibold mb-2">총 예상 지급액</p>
          <p className="text-4xl font-bold text-yellow-600">
            {formatCurrency(result.totalAmount)}
          </p>
        </div>
      </div>

      {/* 계산 과정 설명 */}
      <div className="bg-white rounded-lg p-6 border-l-4 border-yellow-500">
        <h3 className="text-lg font-bold text-gray-800 mb-4">계산 과정</h3>
        <div className="space-y-3 text-gray-700">
          <p className="text-sm">
            <span className="font-semibold">1단계:</span> 평균임금 계산 (월급 ÷ 30)
          </p>
          <p className="text-sm">
            <span className="font-semibold">2단계:</span> 1일 실업급여 계산 <br />(평균임금 × 60%)
          </p>
          <p className="text-sm">
            <span className="font-semibold">3단계:</span> 상한액/하한액 적용 <br />(최대 76,000원 / 최소 51,750원)
          </p>
          <p className="text-sm">
            <span className="font-semibold">4단계:</span> 연령 + 가입기간에 따라<br /> 지급일수 결정
          </p>
          <p className="text-sm">
            <span className="font-semibold">5단계:</span> 총 지급액 = 1일 급여 × 지급일수
          </p>
        </div>
      </div>

      {/* 주의사항 */}
      <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
        <p className="text-sm text-gray-700">
          <span className="font-bold">📋 주의:</span> 이 계산기는 2026년 기준 <br />일반적인 계산입니다.
          정확한 실업급여는 관할 고용센터에 문의하시기 바랍니다.
        </p>
      </div>

      {/* 버튼 영역 */}
      <button
        onClick={onReset}
        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
      >
        🔄 다시 계산하기
      </button>
    </div>
  );
}
