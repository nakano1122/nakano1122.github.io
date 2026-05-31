/**
 * 日付フォーマッター
 */

export function formatYearMonth(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}/${month}`;
}

export function formatYearMonthDay(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

export function formatPeriodBilingual(
  startMonth: string,
  finishMonth?: string
): { ja: string; en: string } {
  const formatMonth = (month: string) => {
    const [year, m] = month.split('-');
    return `${year}/${m}`;
  };

  const start = formatMonth(startMonth);
  const endJa = finishMonth ? formatMonth(finishMonth) : '現在';
  const endEn = finishMonth ? formatMonth(finishMonth) : 'Present';

  return {
    ja: `${start} - ${endJa}`,
    en: `${start} - ${endEn}`,
  };
}

export function formatPeriod(startMonth: string, finishMonth?: string): string {
  return formatPeriodBilingual(startMonth, finishMonth).ja;
}

export { formatYearMonth as formatDate };
