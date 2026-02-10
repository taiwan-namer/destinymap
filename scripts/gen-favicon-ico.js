/**
 * Generate a minimal 32x32 favicon.ico (purple #8B5CF6 fill) and write to app/favicon.ico
 * ICO format: header (6) + directory entry (16) + BITMAPINFOHEADER (40) + pixel data (32*32*4)
 */
const fs = require('fs');
const path = require('path');

const W = 32;
const H = 32;
const BPP = 32;
const rowBytes = Math.floor((W * BPP + 31) / 32) * 4;
const imageSize = 40 + rowBytes * H;
const offset = 6 + 16;

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);

const entry = Buffer.alloc(16);
entry[0] = W;
entry[1] = H;
entry[2] = 0;
entry[3] = 0;
entry[4] = 1;
entry[5] = 0;
entry[6] = BPP;
entry[7] = 0;
entry.writeUInt32LE(imageSize, 8);
entry.writeUInt32LE(offset, 12);

const infoHeader = Buffer.alloc(40);
infoHeader.writeUInt32LE(40, 0);
infoHeader.writeUInt32LE(W, 4);
infoHeader.writeUInt32LE(H * 2, 8); // ICO stores height as 2*height
infoHeader.writeUInt16LE(1, 12);
infoHeader.writeUInt16LE(BPP, 14);
infoHeader.writeUInt32LE(0, 16);
infoHeader.writeUInt32LE(0, 20);
infoHeader.writeUInt32LE(0, 24);
infoHeader.writeUInt32LE(0, 28);
infoHeader.writeUInt32LE(0, 32);
infoHeader.writeUInt32LE(0, 36);

// Purple #8B5CF6 as BGRA
const R = 0x8B, G = 0x5C, B = 0xF6, A = 255;
const pixels = Buffer.alloc(rowBytes * H);
for (let y = H - 1; y >= 0; y--) {
  for (let x = 0; x < W; x++) {
    const i = (H - 1 - y) * rowBytes + x * 4;
    pixels[i] = B;
    pixels[i + 1] = G;
    pixels[i + 2] = R;
    pixels[i + 3] = A;
  }
}

const ico = Buffer.concat([header, entry, infoHeader, pixels]);
const outPath = path.join(__dirname, '..', 'app', 'favicon.ico');
fs.writeFileSync(outPath, ico);
console.log('Created app/favicon.ico');
