// Form validation code will come here.
let typeOfProperty = document.querySelector("[name = \"typeOfProperty\"]");
let erfSize = document.querySelector("[name = \"erfSize\" ]");
let floorSize = document.querySelector("[name = \"floorSize\" ]");
let bedrooms = document.querySelector("[name = \"bedrooms\" ]");
let bathrooms = document.querySelector("[name = \"bathrooms\" ]");
let ratesAndTaxes = document.querySelector("[name = \"ratesAndTaxes\" ]");
let petsAllowed = document.querySelector("[name = \"petsAllowed\" ]");
let garage = document.querySelector("[name = \"garage\" ]");
let garden = document.querySelector("[name = \"garden\" ]");
let pool = document.querySelector("[name = \"pool\" ]");
let internetAccess = document.querySelector("[name = \"internetAccess\" ]");
let description = document.querySelector("[name = \"_description\" ]");
let kitchens = document.querySelector("[name = \"kitchens\" ]");
let lounges = document.querySelector("[name = \"lounges\" ]");
let diningRooms = document.querySelector("[name = \"diningRooms\" ]");
let security = document.querySelector("[name = \"security\" ]");
let nearbyPublicTransport = document.querySelector("[name = \"nearbyPublicTransport\" ]");
let kitchen = document.querySelector("[name = \"kitchen\" ]");
let lounge = document.querySelector("[name = \"lounge\" ]");
let diningRoom = document.querySelector("[name = \"diningRoom\" ]");
let domesticRooms = document.querySelector("[name = \"domesticRooms\" ]");
let receptionRooms = document.querySelector("[name = \"receptionRooms\" ]");
let submit = document.querySelector('.submit');
let result = document.querySelector("[name = \"result\"]");
let loading_img = document.querySelector('.loading_img');
result.innerHTML = '';

function multipleHandler(node){
  var selected = [];
  for (var option of node.options) {
      if (option.selected) {
          selected.push(option.value);
      }
  }
  let result = selected.join();
  return result;
}

submit.addEventListener('click', (e) => {
  e.preventDefault();

  result.style.height = '0';
  loading_img.style.height = '50px';
  result.innerHTML = '';

  // Form validating and default values

  if(erfSize.value == '')
    erfSize.value = 0;
  if(floorSize.value == '')
    floorSize.value = 0;
  if(bedrooms.value == '')
    bedrooms.value = 0;
  if(bathrooms.value == '')
    bathrooms.value = 0;
  if(ratesAndTaxes.value == '')
    ratesAndTaxes.value = 0;
  if(kitchens.value == '')
    kitchens.value = 0;
  if(lounges.value == '')
    lounges.value = 0;
  if(diningRooms.value == '')
    diningRooms.value = 0;
  if(domesticRooms.value == '')
    domesticRooms.value = 0;
  if(receptionRooms.value == '')
    receptionRooms.value = 0;
  if(typeOfProperty.value == '')
    typeOfProperty.value = 'House';
  
  // Fetching data and await for response
  (async () => {

    const rawResponse = await fetch('/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'typeOfProperty': typeOfProperty.value,
        'erfSize': erfSize.value,
        'floorSize': floorSize.value,
        'bedrooms': bedrooms.value,
        'bathrooms': bathrooms.value,
        'ratesAndTaxes': ratesAndTaxes.value,
        'petsAllowed': petsAllowed.value,
        'garage': multipleHandler(garage),
        'garden': multipleHandler(garden),
        'pool': multipleHandler(pool),
        'internetAccess': multipleHandler(internetAccess),
        'description': multipleHandler(description),
        'kitchens': kitchens.value,
        'lounges': lounges.value,
        'diningRooms': diningRooms.value,
        'security': multipleHandler(security),
        'nearbyPublicTransport': multipleHandler(nearbyPublicTransport),
        'kitchen': multipleHandler(kitchen),
        'lounge': multipleHandler(lounge),
        'diningRoom': multipleHandler(diningRoom),
        'domesticRooms': domesticRooms.value,
        'receptionRooms': receptionRooms.value
      })

    });
    const content = await rawResponse.json();

    loading_img.style.height = '0';
    result.style.height = "50px";
    result.innerHTML = 'R ' + Math.round(content.predict);
  })();
})
