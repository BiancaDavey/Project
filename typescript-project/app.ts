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

class StoneMap {
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

const stoneMap = new StoneMap(8, 10);
document.getElementById('class2')?.appendChild(stoneMap.element)

type Class2 = {
    rowNumber: number
    stoneNumberPerRow: number
    takenStones?: number[]
}

type Item = {
    id: number
    title: string
    img: string
    class2: Class2
}

async function http<T>(request: RequestInfo): Promise<T> {
    const response = await fetch(request)
    if (!response.ok){
        throw new Error (response.statusText)
    }
    const headers = response.headers
    const data = headers.get('content-type')?.includes('json')
        ? await response.json()
        : {}
    return data
}

async function fetchItems() {
    const items = await http<Item[]>('http://localhost:8000/items')
    console.log(items)
}

fetchItems()

class Class1 {
    items: Item[] = []
    stoneMap: StoneMap | null = null
    class2Container: HTMLDivElement
    itemsContainer: HTMLDivElement
    itemElements: HTMLDivElement[] = []

    constructor() {
        this.itemsContainer = document.createElement('div')
        this.itemsContainer.id = 'items'
        this.itemsContainer.classList.add('items')
        this.class2Container = document.createElement('div')
        this.class2Container.id = 'class2'
        this.class2Container.classList.add('class2')
        const boardAreaUpperElement = document.createElement('div')
        boardAreaUpperElement.classList.add('boardAreaUpper')
        boardAreaUpperElement.innerText = 'BoardAreaUpper'
        this.class2Container.appendChild(boardAreaUpperElement)
        document.getElementById('class1')?.append(this.itemsContainer, this.class2Container)
    }

    async fetchItems(){
        this.items = await http<Item[]>('http://localhost:8000/items')
        if (this.items.length){
            this.renderItems()
            // Selects first item by default.
            this.selectItem(0)
        }
    }

    renderItems() {
        // Clearing out existing items.
        this.itemElements = []
        this.itemsContainer.innerHTML = ''
        this.items.forEach((item, index) => {
            const itemElement = document.createElement('div')
            itemElement.id = item.id.toString()
            itemElement.classList.add('item')
            // Clicking item selects the item.
            itemElement.addEventListener('click', () => {
                if (!itemElement.classList.contains('selected')) {
                    this.selectItem(index)
                }
            })
            const imgElement = document.createElement('img')
            imgElement.classList.add('img')
            imgElement.src = item.img
            const titleElement = document.createElement('div')
            titleElement.classList.add('title')
            titleElement.innerText = item.title
            itemElement.append(imgElement, titleElement)
            this.itemElements.push(itemElement)
            this.itemsContainer.appendChild(itemElement)
        })
    }

    selectItem(selectedIndex: number) {
        this.itemElements.forEach((element, index) =>
            selectedIndex === index
                ? element.classList.add ('selected')
                : element.classList.remove('selected')
        )
        const {
            class2: { rowNumber, stoneNumberPerRow, takenStones },
        } = this.items[selectedIndex]
        // Render new stone map.
        if (this.stoneMap){
            this.class2Container.lastChild?.remove()
        }
        this.stoneMap = new StoneMap(rowNumber, stoneNumberPerRow, takenStones)
        this.class2Container.append(this.stoneMap.element)
    }
}

// Initialise app with class1 object.
const class1 = new Class1()
class1.fetchItems()
