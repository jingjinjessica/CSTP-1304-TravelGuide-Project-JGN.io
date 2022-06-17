// Data of introduction
const infoData = [
    {
        id: 1,
        title: "Introduction : Vancouver",
        name: "vancouver",
        description1: "Vancouver is located on the Pacific Coast in southwestern British Columbia. Covering 114 square kilometers (44 square miles), it is the second-smallest area of eight major Canadian cities. The metropolitan area of 2,787 square kilometers (1,076 square miles) is the third-largest metropolitan area in Canada. In March 1995, the city of Vancouver won a silver medal as the second-best city in the world.Vancouver was incorporated in 1886 and named after Captain George Vancouver (1757–98), who first sailed round Vancouver, exploring and charting Burrard Inlet and adjacent waters. Vancouver is known as one of the most beautiful cities in the world. Bordered by the Pacific Ocean, the Fraser River, the Burrard Inlet,and the Coast Mountains to the east, the city is surrounded by shimmering waters and towering trees.",
        picture1: "image/info-van.jpeg",
        description2: "With 44 percent of its population comprised of visible minorities, Vancouver is truly a multicultural city. It is home to Canada's largest Chinatown, its largest gay community, and boasts numerous ethnic neighborhoods, such as Little India and Little Italy. However, all Vancouver residents are called Vancouverites. In 1986, the city played host to the World Expo. Since then, tourism has grown considerably and now draws more than five million visitors to the region each year. The Port of Vancouver, a world-class port situated on Burrard Inlet, is one of the busiest in North America. The port situates Vancouver as Canada's gateway to Asia. By hosting the Asia-Pacific Economic Conference (APEC) in 1997, the city cemented its place in Pacific Rim trade.",
        picture2: "image/info-van2.jpeg"
    },

    {
        id: 2,
        title: "Introduction : Beijing",
        name: "beijing",
        description1: "Beijing is the capital of China, a country in eastern Asia. The city sits between two rivers on a plain in northeastern China. Beijing is an old city that has been China’s center of government for almost 800 years. It is also the country’s main center of industry, education, and culture.",
        picture1: "image/info-bjin.jpeg",
        description2: "People have lived in the Beijing area for thousands of years. Several towns were built on the site and later destroyed. In the 1200s the Mongol leader Kublai Khan built the city of Dadu on the site. He made Dadu the capital of China. Except for a few brief periods, the city has been China’s capital ever since.The city was renamed Beijing in the early 1400s. It was known as Peking in the United States and other Western countries until the early 1980s. “Beijing” is now the official way to write the city’s name in English. In the 1980s and ’90s, three of Beijing’s historical areas—the Forbidden City, the Summer Palace, and the Temple of Heaven—were named World Heritage sites by the United Nations Educational, Scientific and Cultural Organization (UNESCO). At the same time many new apartment buildings, shopping centers, and office buildings gave the city a new look. Some of the new buildings were constructed for the 2008 Summer Olympics, which Beijing hosted. Population (2014 estimate), urban area, 19,520,000.",
        picture2: "image/info-bjin2.jpeg"
    },

    {
        id: 3,
        title: "Introduction : Jakarta",
        name: "jakarta",
        description1: "Jakarta is the dynamic capital city of the Republic of Indonesia, a country composed of more than 17,000 islands with a population of over 210 million. Comprising more than 300 ethnic groups speaking 200 distinct languages and dialects, the Indonesian population exhibits incredible diversity in its linguistic, cultural and religious traditions. As the nation's capital, Jakarta is truly a meeting point of representatives from throughout the archipelago.",
        picture1: "image/info-jkt.jpeg",
        description2: "The history of Jakarta dates back to at least the 14th Century with the development of a small port of the Hindu Pajajaran kingdom at the mouth of the Ciliwung river. Searching for the fabled spice islands, the Portuguese were the first Europeans to arrive and establish a fortress on the site in the early 16th Century. The old port was attacked by a neighboring sultanate under the leadership of Prince Fatahillah. After the assault, the Portuguese navy fleet was destroyed. Fatahillah changed the name of the Sunda Kelapa port to Jayakarta, meaning “Total Victory”. It was to this town that Dutch spice merchants came in the late 16th Century and began a trading association with Europe that was to dictate the history of Jakarta, and Indonesia as a nation, for nearly 350 years. Under the Dutch East India Company (VOC) the town of Jayakarta was renamed to Batavia in 1619; from here they ruled Indonesia for more than three centuries. Following the Japanese invasion and rule of the country from 1942-45, on August 17,1945, Indonesia's first president Soekarno, proclaimed Indonesian independence and Jakarta became the accepted nation's capital.",
        picture2: "image/info-jkt2.jpeg"
    }
]

// localstorge of data
let cityString = JSON.stringify(infoData);
localStorage.setItem('infoItem', cityString);
let getCityData = localStorage.getItem('cityItem');
let getInfoArr = JSON.parse(getCityData);

// Create a url of each city
function parseUrl(url) {
    if (url === "") {
        return {};
    }
    const t1 = url.split("?")
    if (t1.length <= 1) {
        return {};
    }

    result = {};
    for (let q of t1[1].split("&")) {
        let t = q.split("=");
        result[t[0]] = t[1];
    }
    return result;
}

// search city
function search(city) {
    return infoData.filter(location => (location["name"].includes(city)
    ));
}

document.querySelector('.search-btn').addEventListener('click',
    function () {
    const value = document.querySelector('.search-input').value
    localStorage.setItem('location', value);
    }
)

// Display introduction of city
function infoDisplay() {
    const searchQuery = parseUrl(window.location.href);
    if (searchQuery["location"]) {
        infoList = search(searchQuery["location"].toLowerCase());
    }
	
    // Get the container
    let containerElm = document.getElementById("container");
    // find each city data in list
    for (let city of infoList) {
        // title of city in row
		newrow1 = document.createElement("div");
		newrow1.className = 'row';
		newrow1.id = 'info-title';

        // Information of city part 1 in row
		newrow2 = document.createElement("div");
		newrow2.className = 'row';
		newrow2.id = 'info-content';
		 // Information of city part 2 in row
		newrow3 = document.createElement("div");
		newrow3.className = 'row';
		newrow3.id = 'info-content';

        // title in column
		newcel1 = document.createElement("h1");
		newcel1.className = 'city-title';
		newcel1.innerHTML = city["title"];
		// image in left column 
		newcel2 = document.createElement("div");
		newcel2.className = 'col-sm';
		newcel2.innerHTML = '<img class="img-1" src="' + city["picture1"] + '" alt="' + city["name"] + '">';
		// paragraph in right column
		newcel3 = document.createElement("div");
		newcel3.className = 'col-sm';
		newcel3.id = 'info-paragraph';
		newcel3.innerHTML = '<p>'+ city["description1"]+'</p>';
		// paragraph in left column
		newcel4 = document.createElement("div");
		newcel4.className = 'col-sm';
		newcel4.id = 'id=info-paragraph';
		newcel4.innerHTML = '<p>' + city["description2"]+ '</p>';
		// image in right column 
		newcel5 = document.createElement("div");
		newcel5.className = 'col-sm';
		newcel5.innerHTML = '<img class="img-2" src="' + city["picture2"] + '" alt="' + city["name"] + '">';
        
        // Append column in each row
		newrow1.appendChild(newcel1); 
		newrow2.appendChild(newcel2);
		newrow2.appendChild(newcel3);
		newrow3.appendChild(newcel4);
		newrow3.appendChild(newcel5);
		// Append row in container
		containerElm.appendChild(newrow1);
		containerElm.appendChild(newrow2);
		containerElm.appendChild(newrow3);
    }
}
