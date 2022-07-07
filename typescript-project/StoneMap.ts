import Row from './Row';

export default class StoneMap {
    rows: Row[]
    selectedStones: number[]  = []
    element: HTMLDivElement

    constructor(rowNumber: number, stoneNumberPerRow: number, takenStones: number[] = []){
        this.rows = Array.from({ length: rowNumber }).map((_, index) => {
            return new Row(index, stoneNumberPerRow, takenStones)
        })
        this.element = document.createElement('div')
        this.element.classList.add('stone-map')
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