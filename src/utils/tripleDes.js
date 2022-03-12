import crypto from "crypto-js";

const options = {
  mode: crypto.mode.ECB,
  padding: crypto.pad.Pkcs7,
  iv: new Uint8Array(8),
};

function Encrypt(value) {
  var key = crypto.enc.Utf8.parse("fc458a9a9d6b612401215f1e347d98ddff6e14c4");
  var md5Key = crypto.MD5(key);

  return crypto.TripleDES.encrypt(
    crypto.enc.Utf8.parse(value),
    md5Key,
    options
  );
}

export default {
  Encrypt,
};
