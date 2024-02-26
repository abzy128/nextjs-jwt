const goqrURL = "https://api.qrserver.com/v1";

export async function createQRCode(url: string) {
    const qrURL = `${goqrURL}/create-qr-code/?size=150x150&data=${url}`;
    return qrURL;
}