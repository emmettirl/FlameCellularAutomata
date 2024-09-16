// fixed width font must be used

// Character palette to represent heat of a flame.
// Low index is cold, high index is hot.
const charHeatMapping: String[] =[" ", ".","%", "#", "&", "@"]
const maxCharHeatIndex = charHeatMapping.length - 1

const maxFade = 1


const randomInt = ({min, max}: { min: number, max: number }) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

class DisplayArray {
    private num_columns: number = 50
    private num_rows: number = 10

    private pixels: Pixel[][] = [];

    public initialize() {
        for (let i: number = 0; i < this.num_rows; i++) {
            this.pixels[i] = []
            for (let j: number = 0; j < this.num_columns; j++) {
                this.pixels[i][j] = new Pixel(0)
            }
        }

        for (let i: number = 0; i < this.num_columns-1; i++) {
            this.pixels[0][i].setHeat(2)
        }

        this.update()
    }

    public update() {
        this.spark()
        this.propagate()
        this.fade()
        this.rise()
        console.log("successfully initialized.")
    }

    private spark() {
        let sparkpoints: number = 2
        for (let i = 0; i < sparkpoints; i++) {
            let spark: number = randomInt({min: 0, max: this.num_columns-1})
            this.pixels[0][spark].setHeat(maxCharHeatIndex);
        }

    }

    private propagate() {
        for (let i: number = 0; i < this.num_columns; i++) {
            if (i < this.num_columns - 1){
                if (this.pixels[0][i + 1].getHeat() == maxCharHeatIndex){
                    if(randomInt({min: 0, max: 3}) == 0){
                        this.pixels[0][i].setHeat(maxCharHeatIndex);
                    }
                }
                else if(i > 0) {
                    if (this.pixels[0][i - 1].getHeat() == maxCharHeatIndex){
                        if(randomInt({min: 0, max: 3}) == 0){
                            this.pixels[0][i].setHeat(maxCharHeatIndex);
                        }
                    }

                }
            }
        }
    }

    public fade(){
        for (let i: number = 0; i < this.num_rows; i++) {
            for (let j: number = 0; j < this.num_columns; j++) {
                if (this.pixels[i][j].getHeat() > 0) {
                    this.pixels[i][j].setHeat(this.pixels[i][j].getHeat() - randomInt({min: 0, max: Math.min(this.pixels[0][i].getHeat(), maxFade)}))
                }
            }
        }
    }

    public printPixels() {
        for (let i: number = 0; i < this.num_rows; i++) {
            let line: String = ""
            for (let j: number = 0; j < this.num_columns; j++) {
                line = line.concat(this.pixels[i][j].getDisplayChar().toString())
            }
            console.log(line)
        }
    }

    private rise() {
        for (let i: number = 1; i < this.num_rows; i++) {
            for (let j: number = 0; j < this.num_columns; j++) {
                let totalHeat = 0
                let numSamples = 1
                if (j < this.num_columns-1){
                    totalHeat += this.pixels[i - 1][j + 1].getHeat();
                    numSamples += 1
                }
                else
                if (j > 0){
                    totalHeat += this.pixels[i - 1][j - 1].getHeat();
                    numSamples += 1
                }
                totalHeat += this.pixels[i-1][j].getHeat();

                this.pixels[i][j].setHeat(Math.floor(totalHeat/numSamples)+randomInt({min: -1, max: 0}));
            }
        }

        }
}

class Pixel {
    private heat: number
    private age: number

    public setHeat(heat: number) {
        this.heat = heat
        if (heat < 0) {
            this.heat = 0
        }
    }

    public getHeat(){
        return this.heat
    }

    public constructor(heat: number) {
        this.heat = heat
        this.age = 0
    }

    public getDisplayChar(): String {
        return charHeatMapping[this.heat]
    }
}

const displayArray = new DisplayArray()
displayArray.initialize()
displayArray.printPixels()