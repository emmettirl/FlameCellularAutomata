import {FireAutomata} from "./FireAutomata"
import {randomInt} from "./constants";
import {enumElementCount, HeatDisplayCharacters} from "./enums";

const numRows = 10 //to be determined by aspect ratio
const numColumns = 50 //to be determined by aspect ratio
const startingHeat = 0
const minSparkIterations = 0 //to be determined by aspect ratio
const maxSparkIterations = 3 //to be determined by aspect ratio

class Field {

    public fieldArray: FireAutomata[][] = []

    constructor() {
        for (let i = 0; i < numRows; i++) {
            this.fieldArray[i] = []
            for (let j: number = 0; j < numColumns; j++) {
                this.fieldArray[i][j] = new FireAutomata(startingHeat, j, i, this.fieldArray)
            }
        }
    }

    public updateField(){
        for (let i = 1; i < this.fieldArray.length; i++) {
            for (let j = 0; j < this.fieldArray[i].length; j++) {
                this.fieldArray[i][j].generate()
            }
            this.fieldArray[i+1] = this.fieldArray[i]
        }
    }

    public sparkField(){
        for (let i = 0; i < randomInt({min: minSparkIterations, max: maxSparkIterations}); i++) {
            let randomNo = randomInt({min: 0, max: this.fieldArray[0].length -1})
            this.fieldArray[0][randomNo].heatState = enumElementCount(HeatDisplayCharacters);
        }
    }

    public displayField(){
        for (let i = this.fieldArray.length -1; i >= 0; i--) {
            let line = ""
            for (let j = 0; j < this.fieldArray[i].length; j++) {
                line += this.fieldArray[i][j].getDisplayInfo().character
            }
            console.log(line)
        }
    }

}

var field: Field = new Field();
field.sparkField();
field.displayField();

