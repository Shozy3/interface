const map = L.map('map', {
  zoomControl: false,
  doubleClickZoom: false,
  scrollWheelZoom: false
}).setView([53.5264657, -113.5082790], 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 19
}).addTo(map);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(map);


function highlightFeature(e) {
    const layer = e.target;
    layer.setStyle({
        fillColor: 'orange',
        fillOpacity: 0.7
    });
}

function resetHighlight(e) {
    const layer = e.target;
    layer.setStyle({
        fillColor: '',
        fillOpacity: 0
    });
}

let check = false;

function onEachFeature(feature, layer) {
    layer.on({

        click: function(e) 
        {
            if (feature.properties.id === 31246611) {
              highlightFeature(e);
              document.getElementById("datepicker").disabled = false;
              document.getElementById("map-dropdown").disabled = false;
              document.getElementById("update-button").disabled = false;
              check = true;

            }
            else{
              resetHighlight(e);
              document.getElementById("datepicker").disabled = true;
              document.getElementById("map-dropdown").disabled = true;
              document.getElementById("update-button").disabled = true;
              check = false;
            }
        }
        
    });
}

function showInstructions() {
  const instructionsContainer = document.getElementById("instructions-container");
  instructionsContainer.style.display = (instructionsContainer.style.display === "none") ? "block" : "none";
}



function fetchBuildings() {
    const bounds = map.getBounds();
    const overpassQuery = `[out:json][timeout:25];(way[building](${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}););out body;>;out skel qt;`;

    fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "data=" + encodeURIComponent(overpassQuery)
    })
    .then(response => response.json())
    .then(data => {
        const geoJsonData = osmtogeojson(data);
        const mapDropdown = document.getElementById("map-dropdown");
        const mapType = mapDropdown.value;

        if (mapType === "zone-map") {
          // TODO: update map to show zone map
        } else if (mapType === "fuel-map") {
          // TODO: update map to show fuel map
        } else if (mapType === "fpb-map") {
          // TODO: update map to show FPB map
        } else if (mapType === "spread-factor") {
          // TODO: update map to show spread factor
        } else if (mapType === "rate-of-spread") {
          // TODO: update map to show rate of spread
        } else if (mapType === "intensity-factor") {
          // TODO: update map to show intensity factor
        }

        L.geoJSON(geoJsonData, {
            style: {
                fillColor: '',
                fillOpacity: 0,
                color: 'transparent'
            },
            onEachFeature: onEachFeature
        }).addTo(map);
    })
    .catch(error => {
        console.error("Error fetching GeoJSON data:", error);
    });
}

// Load osmtogeojson library
const osmToGeoJSONScript = document.createElement("script");
osmToGeoJSONScript.src = "https://cdn.rawgit.com/tyrasd/osmtogeojson/2.2.0/osmtogeojson.js";
osmToGeoJSONScript.onload = fetchBuildings;
document.body.appendChild(osmToGeoJSONScript);

const imageMap = {

  "satellite-map": function(date) {
    if (check)
    {
      return date === "" ? "1) SatelliteMap.jpg" : null;
    }
  },

  "grass-zone1": function(date) {
    if (check)
    {
      return date === "" ? "5.1) GrassZone1.jpg" : null;
    }
  },

  "grass-zone2": function(date) {
    if (check)
    {
      return date === "" ? "5.4) GrassZone2.jpg" : null;
    }
  },

  "grass-zone3": function(date) {
    if (check)
    {
      return date === "" ? "5.7) GrassZone3.jpg" : null;
    }
  },

  "fuel-map-overlay": function(date) {
    if (check)
    {
      return date === "" ? "4) FuelMapOverlay.jpg" : null;
    }
  },

  "deciduous-zone1": function(date) {
    if (check)
    {
      return date === "" ? "5.2) DeciduousZone1.jpg" : null;
    }
  },

  "deciduous-zone2": function(date) {
    if (check)
    {
      return date === "" ? "5.5) DeciduousZone2.jpg" : null;
    }
  },

  "deciduous-zone3": function(date) {
    if (check)
    {
      return date === "" ? "5.8) DeciduousZone3.jpg" : null;
    }
  },

  "conifer-zone1": function(date) {
    if (check)
    {
      return date === "" ? "5.3) ConiferZone1.jpg" : null;
    }
  },

  "conifer-zone2": function(date) {
    if (check)
    {
      return date === "" ? "5.6) ConiferZone2.jpg" : null;
    }
  },

  "conifer-zone3": function(date) {
    if (check)
    {
      return date === "" ? "5.9) ConiferZone3.jpg" : null;
    }
  },

  "fpb-map": function(date) {
    if (check)
    {
      return date === "" ? "5.10) FPBmap.jpg" : null;
    }
  },
  "spread-factor": function(date) {
    if (check)
    {
      return date === "" ? "5.11) SpreadFactor.jpg" : null;
    }
  },
  "rate-of-spread": function(date) {
    if (check)
    {
      if (date === "2022-08-16") {
        return "5.12) RateSpread-Aug16.jpg";
      } else if (date === "2022-11-01") {
        return "5.13) RateSpread-Nov1.jpg";
      } else {
        return null;
      }
    }
  },
  "intensity-factor1": function(date) {
    if (check)
    {
      if (date === "2022-08-16") {
        return "5.14) IntensityFactor1-Aug16.jpg";
      } else if (date === "2022-11-01") {
        return "5.17) IntensityFactor1-Nov1.jpg";
      } else {
        return null;
      }
    }
  },

  "intensity-factor2": function(date) {
    if (check)
    {
      if (date === "2022-08-16") {
        return "5.15) IntensityFactor2-Aug16.jpg";
      } else if (date === "2022-11-01") {
        return "5.18) IntensityFactor2-Nov1.jpg";
      } else {
        return null;
      }
    }
  },

  "intensity-factor3": function(date) {
    if (check)
    {

      if (date === "2022-08-16") {
        return "5.16) IntensityFactor3-Aug16.jpg";
      } else if (date === "2022-11-01") {
        return "5.19) IntensityFactor3-Nov1.jpg";
      } else {
        return null;
      }
    }
  }
};

function showInstructions() {
  const instructionsContainer = document.getElementById("instructions-container");
  instructionsContainer.style.display = (instructionsContainer.style.display === "none") ? "block" : "none";
}




const updateButton = document.getElementById("update-button");

let imageContainer = null;

updateButton.addEventListener("click", function() {
  const mapDropdown = document.getElementById("map-dropdown");
  const mapType = mapDropdown.value;
  const dateInput = document.getElementById("datepicker");
  const date = dateInput.value;
  const getImageFilename = imageMap[mapType];
  const imageName = getImageFilename(date);
  if (imageName) {
    const imageUrl = imageName + "?" + Date.parse(date);
    if (!imageContainer) {
      imageContainer = document.createElement("div");
      imageContainer.id = "map-image-container";
      const image = document.createElement("img");
      image.src = imageUrl;
      image.id = "map-image";
      imageContainer.appendChild(image);
      document.getElementById("controls").appendChild(imageContainer);
    } else {
      const image = imageContainer.querySelector("img");
      image.src = imageUrl;
    }
  } else if (imageContainer) {
    imageContainer.remove();
    imageContainer = null;
  }
  fetchBuildings();
});



map.on("moveend", function() {
    fetchBuildings();
});