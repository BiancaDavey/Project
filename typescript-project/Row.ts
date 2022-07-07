import Stone from "./Stone";

export default class Row {
    id: number
    stones: Stone[]
    element: HTMLDivElement

    constructor(id: number, stoneNumber: number, takenStones: number[] = []) {
        this.id = id
        this.stones = Array.from({length: stoneNumber}).map((_, index) => {
            const stoneId = stoneNumber * id + index
            return new Stone(stoneId, takenStones.includes(stoneId))
        })
        this.element = document.createElement('div')
        this.element.classList.add('row')
        this.element.append(...this.stones.map((stone) => stone.element))
    }

    get selectedStonesId() {
        return this.stones.filter((stone) => stone.isSelected).map((stone) => stone.id)
    }
}