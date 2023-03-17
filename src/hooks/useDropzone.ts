export type DropzoneCallback = (files: ArrayBuffer[]) => void;

export function useDropzone(callback: DropzoneCallback) {
  document.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  document.addEventListener("drop", (e) => {
    e.preventDefault();

    const files = e.dataTransfer?.files;

    if (files === undefined) return;

    const buffers: Promise<ArrayBuffer>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);

      if (file === null) continue;

      buffers.push(file.arrayBuffer());
    }

    Promise.all(buffers).then((awaitedBuffers) => {
      callback(awaitedBuffers);
    });
  });
}
