const TEXT_HEIGHT = 25;
const TEXT_WIDTH = 80;

const HEIGHT =      10;
const FUNNEL =      7;
const LENGTH =      83;
const PATTERNS =	6;

const STR1 = "      ====        ________                ___________ ";
const STR2 = "  _D _|  |_______/        \\__I_I_____===__|_________| ";
const STR3 = "   |(_)---  |   H\\________/ |   |        =|___ ___|   ";
const STR4 = "   /     |  |   H  |  |     |   |         ||_| |_||   ";
const STR5 = "  |      |  |   H  |__--------------------| [___] |   ";
const STR6 = "  | ________|___H__/__|_____/[][]~\\_______|       |   ";
const STR7 = "  |/ |   |-----------I_____I [][] []  D   |=======|__ ";

const WHL11 = "__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__ ";
const WHL12 = " |/-=|___|=    ||    ||    ||    |_____/~\\___/        ";
const WHL13 = "  \\_/      \\O=====O=====O=====O_/      \\_/            ";

const WHL21 = "__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__ ";
const WHL22 = " |/-=|___|=O=====O=====O=====O   |_____/~\\___/        ";
const WHL23 = "  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            ";

const WHL31 = "__/ =| o |=-O=====O=====O=====O \\ ____Y___________|__ ";
const WHL32 = " |/-=|___|=    ||    ||    ||    |_____/~\\___/        ";
const WHL33 = "  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            ";

const WHL41 = "__/ =| o |=-~O=====O=====O=====O\\ ____Y___________|__ ";
const WHL42 = " |/-=|___|=    ||    ||    ||    |_____/~\\___/        ";
const WHL43 = "  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            ";

const WHL51 = "__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__ ";
const WHL52 = " |/-=|___|=   O=====O=====O=====O|_____/~\\___/        ";
const WHL53 = "  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            ";

const WHL61 = "__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__ ";
const WHL62 = " |/-=|___|=    ||    ||    ||    |_____/~\\___/        ";
const WHL63 = "  \\_/      \\_O=====O=====O=====O/      \\_/            ";

const DEL =    "                                                      ";

const COAL01 =  "                              ";
const COAL02 =  "                              ";
const COAL03 =  "    _________________         ";
const COAL04 =  "   _|                \\_____A  ";
const COAL05 =  " =|                        |  ";
const COAL06 =  " -|                        |  ";
const COAL07 =  "__|________________________|_ ";
const COAL08 =  "|__________________________|_ ";
const COAL09 =  "   |_D__D__D_|  |_D__D__D_|   ";
const COAL10 =  "    \\_/   \\_/    \\_/   \\_/    ";

const COALDEL = "                              ";

const TRAIN_ARRAY = [[STR1, STR2, STR3, STR4, STR5, STR6, STR6, WHL11, WHL12, WHL13, DEL],
                    [STR1, STR2, STR3, STR4, STR5, STR6, STR6, WHL21, WHL22, WHL23, DEL],
                    [STR1, STR2, STR3, STR4, STR5, STR6, STR6, WHL31, WHL32, WHL33, DEL],
                    [STR1, STR2, STR3, STR4, STR5, STR6, STR6, WHL41, WHL42, WHL43, DEL],
                    [STR1, STR2, STR3, STR4, STR5, STR6, STR6, WHL51, WHL52, WHL53, DEL],
                    [STR1, STR2, STR3, STR4, STR5, STR6, STR6, WHL61, WHL62, WHL63, DEL]];
const COAL_ARRAY = [COAL01, COAL02, COAL03, COAL04, COAL05, COAL06, COAL07, COAL08, COAL09, COAL10, COALDEL];


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = async function() {
    for(x = TEXT_WIDTH - 1; ; --x) {
        status = trainStep(x);
        await sleep(100);
        if (status == 1)
            break;
    }
    console.log("done");
};

function updateString(textData, string, x, y) {
    for(let i = 0; i < string.length && (i + x) < TEXT_WIDTH; i++) {
        if (x + i > 0 && x + i < TEXT_WIDTH && y > 0 && y < TEXT_HEIGHT)
            textData[y][x + i] = string[i];
    }
}

function drawData(textData) {
    let textArea = document.getElementById('trainArea');
    let resultString = "";
    textData.forEach(function(line) {
        line.forEach(function(char) {
            resultString += char;
        });
        resultString += "\n";
    });
    textArea.value = resultString;
}

function trainStep(x) {
    if (x < - LENGTH)
        return 1;
    let textData = new Array(TEXT_HEIGHT);
    for(i = 0; i < TEXT_HEIGHT; i++) {
        textData[i] = new Array(TEXT_WIDTH);
        textData[i].fill(" ")
    }
    let y = Math.floor(TEXT_HEIGHT / 2) - 5;
    for(let i = 0; i <= HEIGHT; ++i) {
        updateString(textData, TRAIN_ARRAY[(LENGTH + x) % PATTERNS][i], x, y + i);
        updateString(textData, COAL_ARRAY[i], x + 53, y + i);
    }
    drawData(textData);
    return 0;
}
