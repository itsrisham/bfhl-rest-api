const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Update your full name and DOB here
const FULL_NAME = "Risham Goyal";  // use your real name
const DOB = "30072003";            // format: ddmmyyyy
const EMAIL_ID = "risham2157.be22@chitkara.edu.in";
const COLLEGE_ROLL_NUMBER = "2210992157";

app.use(express.json());

app.post('/bfhl', (req, res) => {
  try {
    const inputArray = req.body.input;

    if (!Array.isArray(inputArray)) {
      return res.status(400).json({ is_success: false, message: "Input must be an array." });
    }

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    inputArray.forEach(item => {
      if (typeof item === 'number' || !isNaN(item)) {
        const num = parseInt(item);
        if (num % 2 === 0) even_numbers.push(num);
        else odd_numbers.push(num);
        sum += num;
      } else if (/^[a-zA-Z]$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    const reversedAltCaps = alphabets
      .map(c => c.toLowerCase())
      .reverse()
      .map((char, i) => i % 2 === 0 ? char.toUpperCase() : char.toLowerCase())
      .join('');

    const user_id = `${FULL_NAME.toLowerCase().replace(/\s+/g, "_")}_${DOB}`;

    return res.status(200).json({
      is_success: true,
      user_id,
      email_id: EMAIL_ID,
      college_roll_number: COLLEGE_ROLL_NUMBER,
      even_numbers,
      odd_numbers,
      alphabets,
      special_characters,
      sum,
      alternate_caps_string: reversedAltCaps
    });

  } catch (err) {
    return res.status(500).json({ is_success: false, message: "Server error", error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('BFHL API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
