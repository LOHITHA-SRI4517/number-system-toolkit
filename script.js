"use strict";


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("open");

        menuToggle.textContent =
            navLinks.classList.contains("open")
                ? "✕"
                : "☰";

    });


    document.querySelectorAll("#navLinks a").forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("open");

            menuToggle.textContent = "☰";

        });

    });

}


/* ================= VALIDATION ================= */

function isValidInteger(value) {

    value = value.trim();

    if (value === "") {
        return false;
    }

    return /^[+-]?\d+$/.test(value);
}


function isValidBinary(binary) {

    binary = binary.trim();

    if (binary === "") {
        return false;
    }

    return /^[01]+$/.test(binary);
}


/* ================= BIT WIDTH ================= */

function getRequiredBitWidth(number) {

    const n = BigInt(number);

    if (n >= 0n) {

        if (n === 0n) {
            return 1;
        }

        let bits = 0;
        let value = n;

        while (value > 0n) {

            value >>= 1n;

            bits++;
        }

        return bits;
    }


    let width = 8;

    while (
        n < -(1n << BigInt(width - 1)) ||
        n > (1n << BigInt(width - 1)) - 1n
    ) {

        width *= 2;
    }

    return width;
}


/* ================= DECIMAL TO BINARY ================= */

function decimalToBinary(value) {

    const number = BigInt(value);

    if (number >= 0n) {

        return number.toString(2);

    }


    const width = getRequiredBitWidth(number);

    const modulus = 1n << BigInt(width);

    const twosComplement =
        modulus + number;

    return twosComplement
        .toString(2)
        .padStart(width, "0");
}


/* ================= BINARY TO DECIMAL ================= */

function binaryToDecimal(binary, mode) {

    binary = binary.trim();

    let value = 0n;


    for (let i = 0; i < binary.length; i++) {

        value =
            value * 2n +
            BigInt(binary[i]);

    }


    if (
        mode === "twos" &&
        binary[0] === "1"
    ) {

        const width = binary.length;

        const modulus =
            1n << BigInt(width);

        value =
            value - modulus;
    }


    return value;
}


/* ================= PRIME ================= */

function isPrime(number) {

    const n = BigInt(number);


    if (n <= 1n) {
        return false;
    }


    if (n === 2n) {
        return true;
    }


    if (n % 2n === 0n) {
        return false;
    }


    let divisor = 3n;


    while (divisor * divisor <= n) {

        if (n % divisor === 0n) {
            return false;
        }

        divisor += 2n;
    }


    return true;
}


/* ================= PALINDROME ================= */

function isPalindrome(number) {

    const value = number.toString();


    if (value.startsWith("-")) {
        return false;
    }


    const reversed =
        value
            .split("")
            .reverse()
            .join("");


    return value === reversed;
}


/* ================= RESULT DISPLAY ================= */

function showSuccess(element, message) {

    element.classList.remove("error");

    element.classList.add("success");

    element.innerHTML = message;
}


function showError(element, message) {

    element.classList.remove("success");

    element.classList.add("error");

    element.innerHTML = message;
}


function resetResult(element) {

    element.classList.remove(
        "success",
        "error"
    );

    element.innerHTML =
        "<span>Result will appear here.</span>";
}


/* ================= DECIMAL TOOL ================= */

const decimalInput =
    document.getElementById("decimalInput");

const decimalButton =
    document.getElementById("decimalButton");

const decimalResult =
    document.getElementById("decimalBinaryResult");


if (decimalButton) {

    decimalButton.addEventListener(
        "click",
        function () {

            const input =
                decimalInput.value.trim();


            if (!isValidInteger(input)) {

                showError(
                    decimalResult,
                    "Please enter a valid decimal integer."
                );

                return;
            }


            try {

                const number =
                    BigInt(input);

                const binary =
                    decimalToBinary(number);


                if (number < 0n) {

                    const width =
                        getRequiredBitWidth(number);


                    showSuccess(
                        decimalResult,

                        `<strong>${width}-bit Binary:</strong>&nbsp; ${binary}`
                    );

                } else {

                    showSuccess(
                        decimalResult,

                        `<strong>Binary:</strong>&nbsp; ${binary}`
                    );
                }


            } catch (error) {

                showError(
                    decimalResult,
                    "Unable to convert this number."
                );

            }

        }
    );
}


/* ================= BINARY TOOL ================= */

const binaryInput =
    document.getElementById("binaryInput");

const binaryButton =
    document.getElementById("binaryButton");

const binaryMode =
    document.getElementById("binaryMode");

const binaryResult =
    document.getElementById("binaryDecimalResult");


if (binaryButton) {

    binaryButton.addEventListener(
        "click",
        function () {

            const binary =
                binaryInput.value.trim();


            if (!isValidBinary(binary)) {

                showError(
                    binaryResult,
                    "Invalid binary number. Use only 0 and 1."
                );

                return;
            }


            const mode =
                binaryMode.value;


            try {

                const decimal =
                    binaryToDecimal(
                        binary,
                        mode
                    );


                showSuccess(
                    binaryResult,

                    `<strong>Decimal:</strong>&nbsp; ${decimal.toString()}`
                );


            } catch (error) {

                showError(
                    binaryResult,
                    "Unable to convert this binary number."
                );

            }

        }
    );
}


/* ================= PRIME TOOL ================= */

const primeInput =
    document.getElementById("primeInput");

const primeButton =
    document.getElementById("primeButton");

const primeResult =
    document.getElementById("primeResult");


if (primeButton) {

    primeButton.addEventListener(
        "click",
        function () {

            const input =
                primeInput.value.trim();


            if (!isValidInteger(input)) {

                showError(
                    primeResult,
                    "Please enter a valid integer."
                );

                return;
            }


            try {

                const number =
                    BigInt(input);


                if (isPrime(number)) {

                    showSuccess(
                        primeResult,

                        `<strong>${number.toString()}</strong> is a Prime Number.`
                    );

                } else {

                    showSuccess(
                        primeResult,

                        `<strong>${number.toString()}</strong> is Not a Prime Number.`
                    );
                }


            } catch (error) {

                showError(
                    primeResult,
                    "Unable to check this number."
                );

            }

        }
    );
}


/* ================= PALINDROME TOOL ================= */

const palindromeInput =
    document.getElementById("palindromeInput");

const palindromeButton =
    document.getElementById("palindromeButton");

const palindromeResult =
    document.getElementById("palindromeResult");


if (palindromeButton) {

    palindromeButton.addEventListener(
        "click",
        function () {

            const input =
                palindromeInput.value.trim();


            if (!isValidInteger(input)) {

                showError(
                    palindromeResult,
                    "Please enter a valid integer."
                );

                return;
            }


            if (input.startsWith("-")) {

                showError(
                    palindromeResult,
                    "Negative numbers are not treated as palindrome numbers."
                );

                return;
            }


            try {

                const number =
                    BigInt(input);


                if (isPalindrome(number)) {

                    showSuccess(
                        palindromeResult,

                        `<strong>${number.toString()}</strong> is a Palindrome Number.`
                    );

                } else {

                    showSuccess(
                        palindromeResult,

                        `<strong>${number.toString()}</strong> is Not a Palindrome Number.`
                    );
                }


            } catch (error) {

                showError(
                    palindromeResult,
                    "Unable to check this number."
                );

            }

        }
    );
}


/* ================= CLEAR ================= */

function clearTool(type) {

    if (type === "decimal") {

        decimalInput.value = "";

        resetResult(decimalResult);

        decimalInput.focus();

    }


    else if (type === "binary") {

        binaryInput.value = "";

        resetResult(binaryResult);

        binaryInput.focus();

    }


    else if (type === "prime") {

        primeInput.value = "";

        resetResult(primeResult);

        primeInput.focus();

    }


    else if (type === "palindrome") {

        palindromeInput.value = "";

        resetResult(palindromeResult);

        palindromeInput.focus();

    }

}


/* ================= ENTER KEY ================= */

if (decimalInput) {

    decimalInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {
                decimalButton.click();
            }

        }
    );

}


if (binaryInput) {

    binaryInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {
                binaryButton.click();
            }

        }
    );

}


if (primeInput) {

    primeInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {
                primeButton.click();
            }

        }
    );

}


if (palindromeInput) {

    palindromeInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {
                palindromeButton.click();
            }

        }
    );

}


/* ================= VIVA ACCORDION ================= */

const vivaItems =
    document.querySelectorAll(
        ".viva-list details"
    );


vivaItems.forEach(function (item) {

    item.addEventListener(
        "toggle",
        function () {

            if (item.open) {

                vivaItems.forEach(
                    function (otherItem) {

                        if (otherItem !== item) {

                            otherItem.removeAttribute(
                                "open"
                            );

                        }

                    }
                );

            }

        }
    );

});