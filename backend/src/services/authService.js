const bcrypt = require('bcrypt');

let users = [];
let otpStore = new Map();
let nextUserId = 1;

function createUser({ name, mobileNumber, role = 'Citizen', district = 'Madurai', aadhaarNumber, address }) {
  const existingUser = users.find((user) => user.mobileNumber === mobileNumber);
  if (existingUser) {
    return existingUser;
  }

  const user = {
    id: nextUserId++,
    name,
    mobileNumber,
    role,
    district,
    aadhaarNumber,
    address,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  return user;
}

function findUserByMobile(mobileNumber) {
  return users.find((user) => user.mobileNumber === mobileNumber);
}

async function addOtp(mobileNumber, otp) {
  const hashedOtp = await bcrypt.hash(otp, 10);
  otpStore.set(mobileNumber, { otp: hashedOtp, createdAt: Date.now() });
  return hashedOtp;
}

async function verifyOtp(mobileNumber, otp) {
  const entry = otpStore.get(mobileNumber);
  if (!entry) {
    return false;
  }

  return bcrypt.compare(otp, entry.otp);
}

module.exports = {
  createUser,
  findUserByMobile,
  addOtp,
  verifyOtp,
};
