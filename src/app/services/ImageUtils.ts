export function blobToArrayBuffer(
  source: FileList | Blob[]
): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        resolve(event.target["result"] as ArrayBuffer);
      }
    };
    reader.onerror = (event) => {
      if (event.target) {
        reject(event.target["error"]);
      }
    };
    reader.readAsArrayBuffer(source[0]);
  });
}
