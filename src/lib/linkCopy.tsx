export const linkCopy = (addr: string, code: string) => {
  const domain = window.location.origin;

  const url = `${domain}/${addr}/${code}`;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      alert("링크가 복사되었습니다!");
    })
    .catch((err) => {
      console.error("링크 복사에 실패했습니다:", err);
    });
};
