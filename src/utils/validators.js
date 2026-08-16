const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const PRIORITY_LEVELS = ["Low", "Normal", "High", "Emergency"];

exports.isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

exports.isValidPhone = (phone) => /^0\d{9,10}$/.test(phone);

exports.isValidCCCD = (cccd) => /^\d{12}$/.test(cccd);

exports.isValidBloodType = (type) => BLOOD_TYPES.includes(type);

exports.isValidPriorityLevel = (level) => PRIORITY_LEVELS.includes(level);

exports.isPositiveNumber = (value) => typeof value === "number" && value > 0 && !isNaN(value);

exports.isValidGender = (gender) => ["Male", "Female", "Other"].includes(gender);

exports.isFutureOrTodayDate = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return !isNaN(date) && date >= today;
};