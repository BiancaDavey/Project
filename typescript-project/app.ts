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
        this.element.addEventListener('click', () => {
            this.handleClick()
        })
    }

    handleClick() {
        if (this.status === STATUS.TAKEN) return
        this.element.classList.remove(this.status.toLowerCase())
        this.status = this.status === STATUS.AVAILABLE ? STATUS.SELECTED : STATUS.AVAILABLE
        this.element.classList.add(this.status.toLowerCase())
    }

    get isSelected() {
        return this.status === STATUS.SELECTED
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

    get selectedStonesId() {
        return this.stones.filter((stone) => stone.isSelected).map((stone) => stone.id)
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
        this.element.addEventListener('click', () => {
            this.getSelectedStonesId()
        })
    }

    getSelectedStonesId(){
        /*
        this.selectedStones = this.rows.reduce<number[]>((total, row) => {
            total = [... total, ...row.selectedStonesId]
            return total
        }, [])
        */
       this.selectedStones = this.rows.map(row => row.selectedStonesId).flat()
        console.log(`selected stones: ${this.selectedStones.join(',')}`)
    }

}

const stoneMap = new StoneMap(8, 10);
document.getElementById('class2')?.appendChild(stoneMap.element)