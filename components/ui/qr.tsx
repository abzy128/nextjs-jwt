export default function QR() {
  function getQR() {
    fetch("/api/qr?url=https://example.com")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }
  return <>

  </>;
}
