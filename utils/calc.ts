// 2026년 기준 실업급여 계산 로직

export interface UnemploymentBenefitInput {
  monthlySalary: number; // 세전 월급
  age: number; // 나이
  serviceYears: number; // 고용보험 가입 년수
  serviceMonths: number; // 고용보험 가입 개월수
  isInvoluntary: boolean; // 비자발적 퇴사 여부
}

export interface UnemploymentBenefitResult {
  dailyBenefit: number; // 1일 실업급여
  totalDays: number; // 총 지급일수
  totalAmount: number; // 총 예상 지급액
  averageWage: number; // 평균임금
}

// 2026년 기준 상한액/하한액
const MAX_DAILY_BENEFIT = 76000; // 상한액
const MIN_DAILY_BENEFIT = 51750; // 하한액 (2026 최저임금 기준)

// 연령 + 가입기간에 따른 지급일수 조회표 (비자발적 퇴사 기준)
const BENEFIT_DAYS_TABLE: { [key: string]: number } = {
  // key format: "age_range_service_period"
  // 30세 미만
  "under30_under1year": 90,
  "under30_1year": 120,
  "under30_3years": 150,
  "under30_5years": 180,
  "under30_10years": 210,
  
  // 30세 이상 50세 미만
  "30to50_under1year": 90,
  "30to50_1year": 150,
  "30to50_3years": 180,
  "30to50_5years": 210,
  "30to50_10years": 240,
  
  // 50세 이상
  "over50_under1year": 90,
  "over50_1year": 150,
  "over50_3years": 210,
  "over50_5years": 240,
  "over50_10years": 300,
};

/**
 * 연령대 구분
 */
function getAgeGroup(age: number): string {
  if (age < 30) return "under30";
  if (age < 50) return "30to50";
  return "over50";
}

/**
 * 가입기간에 따른 카테고리 결정
 */
function getServicePeriodCategory(years: number, months: number): string {
  const totalMonths = years * 12 + months;
  
  if (totalMonths < 12) return "under1year";
  if (totalMonths < 36) return "1year";
  if (totalMonths < 60) return "3years";
  if (totalMonths < 120) return "5years";
  return "10years";
}

/**
 * 총 지급일수 조회
 */
function getTotalBenefitDays(
  age: number,
  serviceYears: number,
  serviceMonths: number,
  isInvoluntary: boolean
): number {
  // 자발적 퇴사인 경우 기본 120일 고정 (또는 자격 미충족)
  if (!isInvoluntary) {
    const totalMonths = serviceYears * 12 + serviceMonths;
    if (totalMonths < 12) return 0; // 12개월 미만이면 급여 대상 아님
    return 120; // 자발적 퇴사는 최대 120일
  }

  const ageGroup = getAgeGroup(age);
  const servicePeriodCategory = getServicePeriodCategory(serviceYears, serviceMonths);
  const key = `${ageGroup}_${servicePeriodCategory}`;

  return BENEFIT_DAYS_TABLE[key] || 90; // 기본값 90일
}

/**
 * 실업급여 계산 함수
 */
export function calculateUnemploymentBenefit(
  input: UnemploymentBenefitInput
): UnemploymentBenefitResult {
  const { monthlySalary, age, serviceYears, serviceMonths, isInvoluntary } = input;

  // 1. 평균임금 = 월급 ÷ 30
  const averageWage = Math.floor(monthlySalary / 30);

  // 2. 1일 실업급여 = 평균임금 × 60%
  let dailyBenefit = Math.floor(averageWage * 0.6);

  // 3. 상한액/하한액 적용
  if (dailyBenefit > MAX_DAILY_BENEFIT) {
    dailyBenefit = MAX_DAILY_BENEFIT;
  }
  if (dailyBenefit < MIN_DAILY_BENEFIT) {
    dailyBenefit = MIN_DAILY_BENEFIT;
  }

  // 4. 총 지급일수 조회
  const totalDays = getTotalBenefitDays(age, serviceYears, serviceMonths, isInvoluntary);

  // 5. 총 예상 지급액
  const totalAmount = dailyBenefit * totalDays;

  return {
    dailyBenefit,
    totalDays,
    totalAmount,
    averageWage,
  };
}

/**
 * 결과 포맷팅 함수 (사용자 표시용)
 */
export function formatCurrency(amount: number): string {
  return amount.toLocaleString("ko-KR", {
    style: "currency",
    currency: "KRW",
    minimumFractionDigits: 0,
  });
}
