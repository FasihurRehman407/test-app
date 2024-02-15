import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const qrcodeRegionId = "html5qr-code-full-region";

const Html5Plugin = (props) => {
  const [qrCode, qrCodeSet] = useState(null);

  const onError = (errorMsg, errorObj) => {
    console.log();
  };

  useEffect(() => {
    const config = {
      fps: props?.fps,
      qrbox: props?.qrbox,
      aspectRatio: props?.aspectRatio,
      disableFlip: props?.disableFlip,
    };
    const qrCode = new Html5Qrcode(qrcodeRegionId, props?.verbose);
    qrCodeSet(qrCode);
    qrCode.start({ facingMode: props.mode }, config, props.qrCodeSuccessCallback, onError);
    return () => {
      if (qrCode.isScanning) {
        qrCode.stop().then(() => {
          console.log("stopped");
          qrCode.clear();
        });
      }
    };
  }, []);

  return (
    <>
      <div id={qrcodeRegionId} style={{ width: "100%", height: "488px" }} />
      <div>
        <button
          onClick={() => {
            qrCode?.stop().then(() => {
              console.log("stopped");
              qrCode?.clear();
            });
          }}
        >
          Back to Returns
        </button>
      </div>
    </>
  );
};

export default Html5Plugin;
