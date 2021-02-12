(function() {
    /*===========================
    <|-Variables              -|>
    ===========================*/
    let app = document.getElementById('app');
    let numberOfCharacters = document.getElementById('numberOfCharacters');

    // Object that contains all the configuration that we use to generate the password.
    // We will modify this object to decide whether or not we want symbols, numbers or capital letters.
    let setting = {
        characters: parseInt(numberOfCharacters.value),
        symbols: true,
        numbers: true,
        uppercases: true,
        lowercases: true
    }

    // Object that contains text strings with all the characters that we will use to generate the password.
    // Characters separated by category (property of the object).
    let characters = {
        symbols: '! @ # $ % ^ & * ( ) _ - + = { [ } ] ; : < , > . ? /',
        numbers: '0 1 2 3 4 5 6 7 8 9',
        uppercases: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
        lowercases: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
    }

    /*===========================
    <|-Events                 -|>
    ===========================*/
    // Event to prevent the app from making a submit to send the data and refreshing the page.
    app.addEventListener('submit', function(e) {
        e.preventDefault();
    });

    // Event for the button that increments the number of characters by one.
    app.elements.namedItem('btnAdd').addEventListener('click', function() {
        setting.characters++;
        numberOfCharacters.value = setting.characters;
    });

    // Event for the button that decrements the number of characters by one.
    app.elements.namedItem('btnSubtract').addEventListener('click', function() {
        // Validate that a password less than 12 characters cannot be selected.
        if (setting.characters > 8) {
            setting.characters--;
            numberOfCharacters.value = setting.characters;   
        }
    });

    // Event for the symbol button that activates or deactivates if we want symbols in the password.
    app.elements.namedItem('symbols').addEventListener('click', function() {
        btnToggle(this); // We execute the function that will alternate the icon and the background of the button.
        setting.symbols = !setting.symbols; // We alternate between true and false in the property of the configuration object.
    });

    // Event for the numbers button that activates or deactivates if we want numbers in the password.
    app.elements.namedItem('numbers').addEventListener('click', function() {
        btnToggle(this); // We execute the function that will alternate the icon and the background of the button.
        setting.numbers = !setting.numbers; // We alternate between true and false in the property of the configuration object.
    });

    // Event for the upper case button that enables or disables if we want upper case in the password.
    app.elements.namedItem('uppercases').addEventListener('click', function() {
        btnToggle(this); // We execute the function that will alternate the icon and the background of the button.
        setting.uppercases = !setting.uppercases; // We alternate between true and false in the property of the configuration object.
    });

    // Event for the button to generate password.
    app.elements.namedItem('generate').addEventListener('click', function () {
        // We execute the function that generates the password.
        generatePassword();
    });

    // Event for password input when clicked.
    app.elements.namedItem('inputPassword').addEventListener('click', function() {
        // We execute the function that will copy the password.
        copyPassword();
    });

    /*===========================
    <|-Functions              -|>
    ===========================*/
    const btnToggle = (button) => {
        button.classList.toggle('false');
        button.childNodes[0].classList.toggle('fa-check');
        button.childNodes[0].classList.toggle('fa-times');
    }

    // Function that generates the password.
    const generatePassword = () => {
        let finalCharacters = ''; // Variable where we save the text string with all the characters that we can use to generate the password.
        let password = ''; // Variable where we will save the password character by character.
        
        // We iterate on the configuration object to access each of the properties.
        for (property in setting) {
            // We ask if the property is equal to true.
            // So it means if you want to accept symbols / numbers / uppercase.

            if (setting[property] == true) {
                // To the variable of final characters we add the text string corresponding to the current iteration.
                // In short, we are creating a text string that contains all the characters that we can use.
                finalCharacters += characters[property] + ' ';
            }
        }

        // We eliminate the last space that is left in the text string.
        finalCharacters = finalCharacters.trim();
        
        // We convert the final character string to an array.
        finalCharacters = finalCharacters.split(" ");

        // Cycle that generates the password letter by letter at random.
        for (let i = 0; i < setting.characters; i++) {
            // We are adding a random letter to the password variable for each iteration.
            // First we take a random number that goes from 0 to the number of Final characters.
            // And then we use that number to access a position of the random array of Endcharacters.
            password += finalCharacters[Math.floor(Math.random() * finalCharacters.length)];
        }

        // We show the password generated in the input.
        app.elements.namedItem('inputPassword').value = password;
    }

    // Function that allows us to copy the password to the clipboard.
    const copyPassword = () => {
        app.elements.namedItem('inputPassword').select();
        document.execCommand('copy');
        document.getElementById('copied').classList.add('active');

        setTimeout(function() {
            document.getElementById('copied').classList.remove('active');
        }, 2000)
    }

    // We generate a password with the default configuration when loading the page.
    generatePassword();
}())