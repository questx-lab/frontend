import { Buffer } from 'buffer'
import deflate from 'deflate-js'

export const decode = (s: string) => {
  try {
    const compressed = base64ToArrayBuffer(s)
    const decompressed = deflate.inflate(compressed)

    return bin2String(decompressed)
  } catch (error) {
    console.log(error)
  }
}

export const base64ToArrayBuffer = (base64: string) => {
  var binaryString = atob(base64)
  var bytes = new Uint8Array(binaryString.length)
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes
}

export const bin2String = (array: Uint8Array) => {
  const byteArray = array
  const bytesString = String.fromCharCode(...byteArray)
  return bytesString
}

export const encode = (s: string) => {
  var uint8Array = new Uint8Array(s.length)
  for (var i = 0; i < s.length; i++) {
    uint8Array[i] = s.charCodeAt(i)
  }

  const compress = deflate.deflate(uint8Array)

  const buffer = Buffer.from(compress)
  return buffer.toString('base64')
}

export const getInfoFromMarkup = (markup: string) => {
  return [...markup.matchAll(/@\[(.*?)]\((.*?)\)/g)].map((list: string[]) => {
    return {
      reg: list[0],
      display: list[1],
      id: list[2],
    }
  })
}

export const getShortAddress = (address: string) => {
  return `${address.slice(0, 5)}...${address.slice(-4)}`
}
