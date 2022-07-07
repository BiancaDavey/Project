enum STATUS {
    AVAILABLE = 'AVAILABLE',
    TAKEN = 'TAKEN',
    SELECTED = 'SELECTED',  
}

export default class Stone {
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