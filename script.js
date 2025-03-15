const defaultEmojiMap = {
    'A': ['🍎', '🔴'], 'B': ['🍌', '💛'], 'C': ['🥕', '🧡'], 'D': ['🍩', '🍫'], 'E': ['🥚', '⚪'],
    'F': ['🐸', '🟢'], 'G': ['🍇', '🟣'], 'H': ['✋', '🖐️'], 'I': ['🍦', '🍨'], 'J': ['🥭', '🟠'],
    'K': ['🥝', '🟩'], 'L': ['🍋', '💛'], 'M': ['🦁', '🟠'], 'N': ['🌰', '🤎'], 'O': ['🍊', '🟠'],
    'P': ['🍍', '💛'], 'Q': ['❓', '❔'], 'R': ['🌈', '🔴'], 'S': ['🌞', '☀️'], 'T': ['🌮', '🟡'],
    'U': ['☂️', '🌧️'], 'V': ['🎻', '🟠'], 'W': ['🍉', '🟥'], 'X': ['❌', '✖️'], 'Y': ['🥱', '🟡'], 'Z': ['🦓', '⚫']
};

let emojiMap = JSON.parse(localStorage.getItem('emojiMap')) || defaultEmojiMap;

function convertToEmoji() {
    let inputText = document.getElementById('inputText').value.toUpperCase();
    let mode = document.getElementById('encodingMode').value;
    let emojiMessage = "";

    for (let char of inputText) {
        if (mode === "multi") {
            emojiMessage += emojiMap[char]?.join("") || char;
        } else {
            emojiMessage += emojiMap[char]?.[0] || char;
        }
    }

    document.getElementById('output').innerHTML = `<strong>Secret Message:</strong> ${emojiMessage}`;
}

function convertToText() {
    let emojiInput = document.getElementById('emojiInput').value.trim();
    let decodedMessage = "";

    for (let char of emojiInput) {
        decodedMessage += Object.keys(emojiMap).find(key => emojiMap[key].includes(char)) || char;
    }

    document.getElementById('decodedOutput').innerHTML = `<strong>Decoded Message:</strong> ${decodedMessage}`;
}

function saveMessage() {
    let message = document.getElementById('output').innerText;
    localStorage.setItem("savedMessage", message);
    alert("Message saved!");
}

function generateShareableLink() {
    let message = encodeURIComponent(document.getElementById('output').innerText);
    let url = `${window.location.href.split('?')[0]}?message=${message}`;
    prompt("Copy this link:", url);
}

function autoDetect() {
    let input = document.getElementById('emojiInput').value;
    if (Object.values(emojiMap).flat().some(e => input.includes(e))) {
        document.getElementById('decodedOutput').innerText = "Emoji detected! Click Decode.";
    }
}

function searchEmoji() {
    let letter = document.getElementById('searchLetter').value.toUpperCase();
    document.getElementById('emojiTable').innerHTML = letter ? `${letter} = ${emojiMap[letter]?.join(" ") || "Not Found"}` : "";
}

function exportEmojiMapping() {
    const blob = new Blob([JSON.stringify(emojiMap)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "emojiMapping.json";
    link.click();
}

function importEmojiMapping(event) {
    let reader = new FileReader();
    reader.onload = () => {
        emojiMap = JSON.parse(reader.result);
        alert("Emoji mapping imported!");
    };
    reader.readAsText(event.target.files[0]);
}
