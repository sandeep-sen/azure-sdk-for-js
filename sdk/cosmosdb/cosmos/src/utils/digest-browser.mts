// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { encodeUTF8 } from "./encode.js";
import { globalCrypto } from "./globalCrypto.js";

export async function digest(str: string): Promise<string> {
  const data = encodeUTF8(str);
  const hash = await globalCrypto.subtle.digest("SHA-256", data);
  return bufferToHex(hash);
}

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (item: number) => ("00" + item.toString(16)).slice(-2))
    .join("");
}
