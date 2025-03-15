// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Handle Input
function handleInput() {
    const inputText = document.getElementById('inputText').value;
    document.getElementById('inputCharCount').textContent = inputText.length;
}

// Emoji Mapping
const emojiMap = {
    'A': '🍎', 'B': '🍌', 'C': '🥕', 'D': '🍩', 'E': '🥚', 'F': '🐸',
    'G': '🍇', 'H': '✋', 'I': '🍦', 'J': '🥭', 'K': '🥝', 'L': '🍋',
    'M': '🦁', 'N': '🌰', 'O': '🍊', 'P': '🍍', 'Q': '❓', 'R': '🌈',
    'S': '🌞', 'T': '🌮', 'U': '☂️', 'V': '🎻', 'W': '🍉', 'X': '❌',
    'Y': '🥱', 'Z': '🦓'
};

// Reverse Emoji Mapping
const reverseEmojiMap = Object.fromEntries(Object.entries(emojiMap).map(([k, v]) => [v, k]));

// Text to Emoji
function textToEmoji(text) {
    return text.toUpperCase().split('').map(char => emojiMap[char] || char).join('');
}

// Emoji to Text
function emojiToText(emojiText) {
    // Use Array.from to handle multi-character emojis correctly
    return Array.from(emojiText).map(char => reverseEmojiMap[char] || char).join('');
}

// Encode Message
function encodeMessage() {
    const inputText = document.getElementById('inputText').value;
    const method = document.getElementById('encodingMethod').value;
    let outputText = '';

    if (method === 'caesar') {
        const shift = parseInt(document.getElementById('shift').value);
        outputText = caesarCipher(inputText, shift);
    } else if (method === 'base64') {
        outputText = btoa(inputText);
    } else if (method === 'binary') {
        outputText = textToBinary(inputText);
    } else if (method === 'rot13') {
        outputText = rot13(inputText);
    } else if (method === 'hex') {
        outputText = textToHex(inputText);
    } else if (method === 'emoji') {
        outputText = textToEmoji(inputText);
    }

    document.getElementById('outputText').value = outputText;
    document.getElementById('outputCharCount').textContent = outputText.length;
    celebrate();
}

// Decode Message
function decodeMessage() {
    const inputText = document.getElementById('inputText').value;
    const method = document.getElementById('encodingMethod').value;
    let outputText = '';

    if (method === 'caesar') {
        const shift = parseInt(document.getElementById('shift').value);
        outputText = caesarCipher(inputText, -shift);
    } else if (method === 'base64') {
        outputText = atob(inputText);
    } else if (method === 'binary') {
        outputText = binaryToText(inputText);
    } else if (method === 'rot13') {
        outputText = rot13(inputText);
    } else if (method === 'hex') {
        outputText = hexToText(inputText);
    } else if (method === 'emoji') {
        outputText = emojiToText(inputText);
    }

    document.getElementById('outputText').value = outputText;
    document.getElementById('outputCharCount').textContent = outputText.length;
    celebrate();
}

// Caesar Cipher
function caesarCipher(text, shift) {
    return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            let shiftAmount = shift % 26;
            if (code >= 65 && code <= 90) {
                return String.fromCharCode(((code - 65 + shiftAmount + 26) % 26) + 65);
            } else if (code >= 97 && code <= 122) {
                return String.fromCharCode(((code - 97 + shiftAmount + 26) % 26) + 97);
            }
        }
        return char;
    }).join('');
}

// Text to Binary
function textToBinary(text) {
    return text.split('').map(char => char.charCodeAt(0).toString(2)).join(' ');
}

// Binary to Text
function binaryToText(binary) {
    return binary.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
}

// ROT13
function rot13(text) {
    return text.replace(/[a-zA-Z]/g, function (char) {
        const code = char.charCodeAt(0);
        const shift = code <= 90 ? 65 : 97;
        return String.fromCharCode(((code - shift + 13) % 26) + shift);
    });
}

// Text to Hex
function textToHex(text) {
    return text.split('').map(char => char.charCodeAt(0).toString(16)).join(' ');
}

// Hex to Text
function hexToText(hex) {
    return hex.split(' ').map(h => String.fromCharCode(parseInt(h, 16))).join('');
}

// Clear Text
function clearText() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
    document.getElementById('inputCharCount').textContent = 0;
    document.getElementById('outputCharCount').textContent = 0;
    document.getElementById('qrCodeContainer').innerHTML = '';
}

// Copy to Clipboard
function copyToClipboard() {
    const outputText = document.getElementById('outputText');
    outputText.select();
    document.execCommand('copy');
    alert('Copied to clipboard!');
}

// Export Output as Text File
function exportOutput() {
    const outputText = document.getElementById('outputText').value;
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'encoded_message.txt';
    a.click();
    URL.revokeObjectURL(url);
}

// Generate QR Code
function generateQRCode() {
    const outputText = document.getElementById('outputText').value;
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    qrCodeContainer.innerHTML = '';

    if (outputText) {
        const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(outputText)}`;
        const img = document.createElement('img');
        img.src = qrCode;
        qrCodeContainer.appendChild(img);
    } else {
        alert('No output text to generate QR code!');
    }
}

// Randomize Encoding
function randomizeEncoding() {
    const methods = ['caesar', 'base64', 'binary', 'rot13', 'hex', 'emoji'];
    const randomMethod = methods[Math.floor(Math.random() * methods.length)];
    document.getElementById('encodingMethod').value = randomMethod;

    if (randomMethod === 'caesar') {
        const randomShift = Math.floor(Math.random() * 25) + 1;
        document.getElementById('shift').value = randomShift;
    }

    encodeMessage();
}

// Celebrate with Confetti
function celebrate() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Toggle Shift Input
document.getElementById('encodingMethod').addEventListener('change', function () {
    document.getElementById('shift').disabled = this.value !== 'caesar';
});