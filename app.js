let fish = 0;
let click = 1

let clickUpgrades = [
    {
        name: 'pole',
        price: 5,
        quantity: 0,
        multiplier: 1

    },
    {
        name: 'net',
        price: 10,
        quantity: 0,
        multiplier: 5
    }
]

let autoUpgrades = [
    {
        name: 'boat',
        price: 50,
        quantity: 0,
        multiplier: 25
    },
    {
        name: 'ship',
        price: 100,
        quantity: 0,
        multiplier: 200
    }
]


totalClicks()
updateClickStats()
updateAutoStats()


function hook() {
    fish += click
    console.log(fish)
    updateFish()
    totalClicks()
}

function updateFish() {
    let fishElem = document.getElementById('totalFish')
    fishElem.innerText = fish
}

function buySupplies(name) {
    let supply = clickUpgrades.find(c => c.name == name)
    if (fish >= supply.price) {
        click = 1
        supply.quantity++
        clickUpgrades.forEach(cu => {
            click += (cu.quantity * cu.multiplier)
        })
        fish -= supply.price
        supply.price *= 2
        console.log(supply.price);
    }
    addPrice(name)
    totalClicks()
    updateFish()
    updateClickStats()

}

function totalClicks() {
    let CCElem = document.getElementById('CC')
    CCElem.innerText = (click)
}

// function totalAutos() {
//     let ACElem = document.getElementById('AC')
//     ACElem.innerText =
// }


function updateClickStats() {
    let template = ''
    clickUpgrades.forEach(c => {
        template += `
            <p>${c.quantity} | ${c.name} | ${(c.multiplier * c.quantity)}</p>`
    })
    document.getElementById('cStats').innerHTML = template

}

function updateAutoStats() {
    let template = ''
    autoUpgrades.forEach(a => {
        template += `
        <p>${a.quantity} | ${a.name} | ${(a.quantity * a.multiplier)}</p>`
    })
    document.getElementById('price')
    document.getElementById('aStats').innerHTML = template
}



function buyAutoUpgrades(name) {
    let auto = autoUpgrades.find(a => a.name == name)
    if (fish >= auto.price) {
        auto.quantity++
        fish -= auto.price
        auto.price *= 2
        console.log('[AUTO PRICE]', auto.price);
    }
    updateAutoStats()
    addAutoPrice(name)
    updateFish()
}


function addFish() {
    let total = 0
    autoUpgrades.forEach(a => {
        fish += (a.quantity * a.multiplier)
        total += (a.quantity * a.multiplier)
        console.log(fish, total)
    })
    updateFish()
    document.getElementById('AC').innerText = total
}

function addPrice(name) {
    // let total = 0
    let click = clickUpgrades.find(c => c.name == name)
    // total += click.price
    document.getElementById(name).innerText = click.price
}

function addAutoPrice(name) {
    let auto = autoUpgrades.find(a => a.name == name)
    document.getElementById(name).innerText = auto.price
}



setInterval(addFish, 2000)