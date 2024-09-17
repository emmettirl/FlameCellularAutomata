import {randomInt} from "./constants"
import {HeatDisplayCharacters, HeatDisplayColors} from "./enums";


export class FireAutomata {
    private _heatState: number;
    private age: number;
    private position: Vector2;
    private positionState: PositionState;
    private field: FireAutomata[][]

    constructor(heatState: number, colPos: number, rowPos: number, field: FireAutomata[][]) {
        this.positionState = {leftWallCollided: false, rightWallCollided: false, bottomWallCollided: false };
        this._heatState = heatState;
        this.position = {X: colPos, Y: rowPos};
        this.age = 0
        this.field = field
    }

    get heatState(): number {
        return this._heatState;
    }

    set heatState(value: number) {
        this._heatState = value;
    }

    public checkPositionState() {
        if (this.position.X >0) {
            this.positionState.leftWallCollided = false;
        }
        else{
        this.positionState.leftWallCollided = true
        }

        if (this.position.X < this.field.length -1) {
            this.positionState.rightWallCollided = false;
        }
        else{
            this.positionState.rightWallCollided = true
        }

        if (this.position.Y > 0) {
            this.positionState.bottomWallCollided = false;
        }
        else {
            this.positionState.bottomWallCollided = true
        }
    }

    public observeNeighbourhood(): number{
        var sumHeat: number = 0;
        var count: number = 0;

        if (!this.positionState.bottomWallCollided){
            console.log(this.position.X)
            console.log(this.position.Y -1)

            sumHeat += this.field[this.position.X][this.position.Y -1].heatState
            count += 1

            if (!this.positionState.leftWallCollided) {
                sumHeat += this.field[this.position.X -1][this.position.Y-1].heatState
                count += 1
            }
            if (!this.positionState.rightWallCollided) {
                sumHeat += this.field[this.position.X +1][this.position.Y-1].heatState
                count += 1
                }
        }
        if (!this.positionState.leftWallCollided) {
            sumHeat += this.field[this.position.X][this.position.Y -1].heatState
            count += 1
        }

        if (!this.positionState.rightWallCollided) {
            sumHeat += this.field[this.position.X][this.position.Y+1].heatState
            count += 1
        }
        return sumHeat / count
    }

    public generate(){
        this.checkPositionState();
        this._heatState = (this.observeNeighbourhood() + this.heatState)/2;
        this.age += 1;
    }

    public fade() {
        if (this.age > 0 && this._heatState > 0) {
            this._heatState -= randomInt({min:0, max:1})
        }
    }

    public getDisplayInfo(): DisplayInfo {
        return {character: HeatDisplayCharacters[this._heatState], color: HeatDisplayColors[this._heatState]};
    }

}

type Vector2 = {
    X: number,
    Y: number
}

type PositionState = {
    leftWallCollided: boolean,
    rightWallCollided: boolean,
    bottomWallCollided: boolean
}

type DisplayInfo = {
    character: string,
    color: string
}
