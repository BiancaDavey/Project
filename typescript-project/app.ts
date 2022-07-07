enum STATUS {
    AVAILABLE = 'AVAILABLE',
    TAKEN = 'TAKEN',
    SELECTED = 'SELECTED',  
}

class Stone {
    id: number
    status: STATUS
    element: HTMLDivElement

    constructor(id: number, isTaken: boolean = false){
        this.id = id
        this.status = isTaken ? STATUS.TAKEN: STATUS.AVAILABLE
        this.element = document.createElement('div')
        this.element.classList.add ('stone')
        this.element.classList.add(this.status.toLowerCase())
    }
}

class Row {
    id: number
    stones: Stone[]
    element: HTMLDivElement

    constructor(id: number, stoneNumber: number) {
        this.id = id
        this.stones = Array.from({length: stoneNumber}).map((_, index) => {
            const stoneId = stoneNumber * id + index
            return new Stone(stoneId)
        })
        this.element = document.createElement('div')
        this.element.classList.add('row')
        this.element.append(...this.stones.map((stone) => stone.element))
    }
}

class StoneMap {
    rows: Row[]
    selectedStones: number[]  = []
    element: HTMLDivElement

    constructor(rowNumber: number, stoneNumberPerRow: number){
        this.rows = Array.from({ length: rowNumber }).map((_, index) => {
            return new Row(index, stoneNumberPerRow)
        })
        this.element = document.createElement('div')
        this.element.classList.add('map')
        this.element.append(...this.rows.map((row) => row.element))
    }
}

const stoneMap = new StoneMap(8, 10);
document.getElementById('class2')?.appendChild(stoneMap.element)