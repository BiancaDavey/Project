import StoneMap from './StoneMap';
import http from './http';


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

async function fetchItems() {
    const items = await http<Item[]>('http://localhost:8000/items')
    console.log(items)
}

fetchItems()

export default class Class1 {
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