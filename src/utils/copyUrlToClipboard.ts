export const copyUrlToClipboard = () => {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => alert('URL이 클립보드에 복사되었습니다!'))
    .catch((err) => {
      alert('URL 복사에 실패했습니다.');
      console.error('클립보드 복사 실패:', err);
    });
};
