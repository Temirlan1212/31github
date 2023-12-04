export const truncateArray = (arr: any[], { max, min }: { max?: number; min?: number }) => (Array.isArray(arr) ? arr?.slice(min || 0, max) : arr);
export const truncateText = (text: string, maxLength: number) => {
  if (typeof "" !== typeof text) return;
  if (text?.length <= maxLength) {
    return text;
  }

  return text?.slice(0, maxLength) + "...";
};
