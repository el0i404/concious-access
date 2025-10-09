import { randomBytes } from 'crypto';
import User from '../models/User';
import EventResult from '../models/EventResult';

// Function to generate a unique alphanumeric code
export async function generateUniqueCode(cameFrom: string): Promise<string> {
  const codeLength = 12;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const randomBytesPromisified = () =>
      new Promise<Buffer>((resolve, reject) =>
        randomBytes(codeLength, (err, buffer) => {
          if (err) reject(err);
          else resolve(buffer);
        })
      );

    const buffer = await randomBytesPromisified();
    const code = Array.from(buffer)
      .map((byte) => characters.charAt(byte % characters.length))
      .join('');

    // Check if the generated code already exists in the database
    const codeExists = null;

    if (cameFrom === 'event_result') {
      await checkCodeExistsInEventResultDB(code);
    } else {
      await checkCodeExistsInUserDB(code);
    }

    if (!codeExists) {
      return code;
    } else {
      generateUniqueCode(cameFrom);
    }
  }
}

// Function to check if a code exists in the database
async function checkCodeExistsInUserDB(code: string): Promise<boolean> {
  const res = await User.findOne({ resetPasswordCode: code });
  if (res) {
    return true;
  }
  return false;
}

// Function to check if a code exists in the database
async function checkCodeExistsInEventResultDB(code: string): Promise<boolean> {
  const res = await EventResult.findOne({ qr_code_number: code });
  if (res) {
    return true;
  }
  return false;
}
