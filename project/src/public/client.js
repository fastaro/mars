let store = Immutable.Map({
    currentRover: '',
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
    roversData: Immutable.Map({})
});

const root = document.getElementById('root')

const updateStore = (state, newState) => {
    store = state.merge(newState);
    render(root, store);
}

const render = async (root, state) => {
    root.innerHTML = App(state, displayHeader, displayData);
}


// Higher order function made to simplify page
const App = (state, header, body) => {
    return `
    <header>
    <div class="container">
        <div class="row">
        ${header()}
        </div>
    </div>
    </header>
    <div class="container">
        ${body()}
    </div>
    <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})
// ------------------------------------------------------  COMPONENTS

const roverClicked = (rover) => {
    updateStore(store, { currentRover: rover })
    getRoverData(rover);
};

const displayHeader = () => {
        return store.get("rovers")
            .map((rover) => `
            <h1 class="col-lg-4 col-sm" onClick=roverClicked("${rover}") href="#">${rover}</h1>
            `)
            .reduce((rarray, rover) => rarray += rover);
    }

const displayData = () => {
    try {
        let str = "";
        str += `<h3>Name: ${store.getIn(['roversData','image','latest_photos']).get(0).get('rover').get('name')}</h3>
        <h3>Launch Date: ${store.getIn(['roversData','image','latest_photos']).get(0).get('rover').get('launch_date')}</h3>
        <h3>Landing Date: ${store.getIn(['roversData','image','latest_photos']).get(0).get('rover').get('landing_date')}</h3>
        <h3>Status: ${store.getIn(['roversData','image','latest_photos']).get(0).get('rover').get('status')}</h3>
        <h3>Photos Taken: ${store.getIn(['roversData','image','latest_photos']).get(0).get('earth_date')}</h3>
        `
        for( let i = 0; i< store.getIn(['roversData','image','latest_photos']).size; i++){
            //added modulus logic so rows will be clean
            if(i % 3 == 0){
                str += `
                <div class="row">
                <div class="col-lg-6 col-sm">
                <img src= ${store.getIn(['roversData','image','latest_photos']).get(i).get('img_src')} alt= "" ></img> 
                </div>`
            }
            if(i % 3 == 2){
                str += `<div class="col-lg-6 col-sm">
                <img src= ${store.getIn(['roversData','image','latest_photos']).get(i).get('img_src')} alt= "" ></img> 
                </div>
                </div>`
            }
            else {
                str += `<div class="col-lg-6 col-sm">
                <img src= ${store.getIn(['roversData','image','latest_photos']).get(i).get('img_src')} alt= "" ></img> 
                </div>`
    }

        }

     return str;
    }
    catch {
        return "";
    }
}
// ------------------------------------------------------  API

// API CALL
const getRoverData = (rover) => {
    if (rover.length > 1) {
    fetch(`http://localhost:3000/` + rover)
        .then(res => res.json())
        .then(data => {
            updateStore(store, {roversData: data});
        }).catch(err => {
            console.log(err);
        });
    }
}