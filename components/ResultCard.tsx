"use client";

import { UnemploymentBenefitResult, formatCurrency } from "@/utils/calc";
import { useEffect } from "react";

interface ResultCardProps {
  result: UnemploymentBenefitResult;
  onReset: () => void;
}

export function ResultCard({ result, onReset }: ResultCardProps) {
  useEffect(() => {
    // 카카오 SDK 로드
    if (typeof window !== "undefined" && !(window as any).Kakao) {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
      script.async = true;
      script.onload = () => {
        (window as any).Kakao.init("d876d8e1dd046ca7033d27e6bfe50e03"); // 카카오 JavaScript 키
      };
      document.head.appendChild(script);
    }
  }, []);

  const handleKakaoShare = () => {
    const resultUrl = `${window.location.origin}?daily=${result.dailyBenefit}&days=${result.totalDays}&total=${result.totalAmount}`;
    
    if ((window as any).Kakao && (window as any).Kakao.Link) {
      (window as any).Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "시럽급여 (HoneyMoney) - 실업급여 계산 결과",
          description: `1일 실업급여: ${formatCurrency(result.dailyBenefit)} | 지급일수: ${result.totalDays}일 | 총액: ${formatCurrency(result.totalAmount)}`,
          imageUrl: `${window.location.origin}/icons/icon-192.png`,
          link: {
            mobileWebUrl: resultUrl,
            webUrl: resultUrl,
          },
        },
        buttons: [
          {
            title: "결과 확인하기",
            link: {
              mobileWebUrl: resultUrl,
              webUrl: resultUrl,
            },
          },
          {
            title: "나도 계산해보기",
            link: {
              mobileWebUrl: window.location.origin,
              webUrl: window.location.origin,
            },
          },
        ],
      });
    }
  };

  const handleCopyLink = () => {
    const resultUrl = `${window.location.origin}?daily=${result.dailyBenefit}&days=${result.totalDays}&total=${result.totalAmount}`;
    navigator.clipboard.writeText(resultUrl);
    alert("공유 링크가 복사되었습니다!");
  };

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
            <span className="font-semibold">2단계:</span> 1일 실업급여 계산 (평균임금 × 60%)
          </p>
          <p className="text-sm">
            <span className="font-semibold">3단계:</span> 상한액/하한액 적용 (최대 76,000원 / 최소 51,750원)
          </p>
          <p className="text-sm">
            <span className="font-semibold">4단계:</span> 연령 + 가입기간에 따른 지급일수 결정
          </p>
          <p className="text-sm">
            <span className="font-semibold">5단계:</span> 총 지급액 = 1일 급여 × 지급일수
          </p>
        </div>
      </div>

      {/* 주의사항 */}
      <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
        <p className="text-sm text-gray-700">
          <span className="font-bold">📋 주의:</span> 이 계산기는 2026년 기준 일반적인 계산입니다.
          정확한 실업급여는 관할 고용센터에 문의하시기 바랍니다.
        </p>
      </div>

      {/* 버튼 영역 */}
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-3">
          {/* 카카오톡 공유 */}
          <button
            onClick={handleKakaoShare}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
          >
            💬 카톡 공유
          </button>

          {/* URL 복사 공유 */}
          <button
            onClick={handleCopyLink}
            className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
          >
            🔗 링크 복사
          </button>

          {/* 다시 계산하기 */}
          <button
            onClick={onReset}
            className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
          >
            🔄 다시 계산
          </button>
        </div>
      </div>
    </div>
  );
}
