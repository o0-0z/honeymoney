"use client";

import { useState } from "react";
import { InputForm } from "@/components/InputForm";
import { ResultCard } from "@/components/ResultCard";
import { AdBanner, AdInContent, AdBottom } from "@/components/AdComponents";
import { calculateUnemploymentBenefit, UnemploymentBenefitInput, UnemploymentBenefitResult } from "@/utils/calc";

export default function Home() {
  const [result, setResult] = useState<UnemploymentBenefitResult | null>(null);

  const handleCalculate = (input: UnemploymentBenefitInput) => {
    const calculatedResult = calculateUnemploymentBenefit(input);
    setResult(calculatedResult);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            🍯 시럽급여 (HoneyMoney)
          </h1>
          <p className="text-xl md:text-2xl text-yellow-600 font-semibold">
            달달하게 계산되는 실업급여
          </p>
          <p className="text-gray-600 mt-4 text-sm md:text-base max-w-xl mx-auto">
            2026년 기준 실업급여를 간단하게 계산해보세요.
            <br />
            정확한 금액은 관할 고용센터에서 확인하시기 바랍니다.
          </p>
        </div>

        {/* 광고 상단 */}
        <AdBanner />

        {/* 메인 컨텐츠 */}
        {result ? (
          <>
            <ResultCard result={result} onReset={handleReset} />
            <AdInContent />
          </>
        ) : (
          <InputForm onSubmit={handleCalculate} />
        )}

        {/* 하단 정보 섹션 */}
        <div className="mt-16 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">ℹ️ 안내사항</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold">•</span>
                <span>
                  이 계산기는 <strong>일반적인 계산</strong>이며, 개인의 상황에 따라 다를 수 있습니다.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold">•</span>
                <span>
                  <strong>고용보험에 12개월 이상 가입</strong>해야 실업급여를 받을 수 있습니다.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold">•</span>
                <span>
                  비자발적 퇴사와 자발적 퇴사에 따라 지급일수가 다릅니다.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold">•</span>
                <span>
                  연령 및 가입기간에 따라 지급일수가 결정됩니다.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold">•</span>
                <span>
                  <strong>정확한 금액은 관할 고용센터</strong>에 문의하세요.
                </span>
              </li>
            </ul>
          </div>

          {/* 추가 광고 */}
          <AdInContent />

          {/* 고용센터 정보 */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📞 관련 기관</h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>고용보험 콜센터:</strong> 1577-0100
              </p>
              <p>
                <strong>고용센터 찾기:</strong> www.work.go.kr
              </p>
              <p>
                <strong>고용보험 홈페이지:</strong> www.ei.go.kr
              </p>
            </div>
          </div>

          {/* 하단 광고 */}
          <AdBottom />
        </div>

        {/* 푸터 */}
        <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>© 2026 HoneyMoney (시럽급여) - 실업급여 계산기</p>
          <p className="mt-2">
            이 사이트의 계산 결과는 참고용이며, 실제 지급액은 고용센터 판단에 따릅니다.
          </p>
        </footer>
      </div>
    </main>
  );
}
