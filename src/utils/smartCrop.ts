declare global {
  interface Window {
    smartcrop: any;
  }
}

const TARGET_WIDTH = 600;
const TARGET_HEIGHT = 800;

export function applySmartCrop(img: HTMLImageElement): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!img || img.dataset.cropped === "1" || !window.smartcrop) {
      resolve();
      return;
    }

    const loader = new Image();
    loader.crossOrigin = "anonymous";
    loader.src = img.src;

    loader.onload = function () {
      window.smartcrop
        .crop(loader, { width: TARGET_WIDTH, height: TARGET_HEIGHT, ruleOfThirds: true })
        .then((result: any) => {
          const crop = result.topCrop;
          const canvas = document.createElement('canvas');
          canvas.width = TARGET_WIDTH;
          canvas.height = TARGET_HEIGHT;
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Canvas context not available'));
            return;
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(
            loader,
            crop.x,
            crop.y,
            crop.width,
            crop.height,
            0,
            0,
            TARGET_WIDTH,
            TARGET_HEIGHT
          );

          try {
            const dataURL = canvas.toDataURL('image/jpeg', 0.85);
            img.src = dataURL;
            img.dataset.cropped = "1";
            resolve();
          } catch (e) {
            img.style.objectPosition = '50% 30%';
            resolve();
          }
        })
        .catch(() => {
          img.style.objectPosition = '50% 30%';
          resolve();
        });
    };

    loader.onerror = () => {
      img.style.objectPosition = '50% 30%';
      resolve();
    };
  });
}

export function applySmartCropToAll(root: Document | HTMLElement = document): void {
  const imgs = root.querySelectorAll('img.smart-crop:not([data-cropped="1"])');
  imgs.forEach((img) => applySmartCrop(img as HTMLImageElement));
}
