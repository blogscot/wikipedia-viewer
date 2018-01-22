// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({5:[function(require,module,exports) {

},{}],6:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const data = ['cors', ['Corsica', 'Corsham', 'Corsican language', 'Corset', 'Corset controversy', 'Corsican immigration to Puerto Rico', 'Corsicana, Texas', 'Corson County, South Dakota', 'Corsier-sur-Vevey', 'Corsicans'], ['Corsica (; French: Corse [k\u0254\u0281s]; Corsica in Corsican and Italian, pronounced [\u02c8korsiga] and [\u02c8k\u0254rsika] respectively) , is an island in the Mediterranean Sea and one of the 18 regions of France.', 'Corsham is a historic market town and civil parish in west Wiltshire, England. It is at the south-western edge of the Cotswolds, just off the A4 national route, which was formerly the main turnpike road from London to Bristol, 28 miles (45 km) southwest of Swindon, 20 miles (32 km) southeast of Bristol, 8 miles (13 km) northeast of Bath and 4 miles (6 km) southwest of Chippenham.', 'Corsican (corsu or lingua corsa) is a Romance language within the Italo-Dalmatian subfamily. It is closely related to the Italian language and especially to its Tuscan branch.', 'A corset is a garment worn to hold and train the torso into a desired shape, traditionally a smaller waist or larger bottom, for aesthetic or medical purposes (either for the duration of wearing it or with a more lasting effect).', "The corset controversy concerns supporters' and detractors' arguments for and against wearing a corset.", 'Corsican immigration to Puerto Rico came about as a result of various economic and political changes in mid-19th century Europe; among those factors were the social-economic changes which came about in Europe as a result of the Second Industrial Revolution, political discontent and widespread crop failure due to long periods of drought, and crop diseases.', 'Corsicana is a city in Navarro County, Texas, United States. It is located on Interstate 45, some 58 miles (89 kilometers) south of downtown Dallas.', 'Corson County is a county located in the U.S. state of South Dakota. As of the 2010 census, the population was 4,050. Its county seat is McIntosh.', "Corsier-sur-Vevey is a municipality in the district of Riviera-Pays-d'Enhaut in the canton of Vaud in Switzerland.", 'The Corsicans (Corsican, Italian and Ligurian: Corsi; French: Corses) are the native people and ethnic group originating in Corsica, a Mediterranean island and a territorial collectivity of France.'], ['https://en.wikipedia.org/wiki/Corsica', 'https://en.wikipedia.org/wiki/Corsham', 'https://en.wikipedia.org/wiki/Corsican_language', 'https://en.wikipedia.org/wiki/Corset', 'https://en.wikipedia.org/wiki/Corset_controversy', 'https://en.wikipedia.org/wiki/Corsican_immigration_to_Puerto_Rico', 'https://en.wikipedia.org/wiki/Corsicana,_Texas', 'https://en.wikipedia.org/wiki/Corson_County,_South_Dakota', 'https://en.wikipedia.org/wiki/Corsier-sur-Vevey', 'https://en.wikipedia.org/wiki/Corsicans']];

exports.default = data;
},{}],4:[function(require,module,exports) {
"use strict";

require("./style.css");

var _dummyData = require("./dummy-data");

var _dummyData2 = _interopRequireDefault(_dummyData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
const icon = document.querySelector('#icon');

const display = list => {
  if (list.length === 0) {
    ul.innerHTML = `<li id="no-match">No matches found.</li>`;
    return;
  }

  ul.innerHTML = list.map(item => {
    return `<a href="${item.link}" target="_blank">
      <li>
        <h2>${item.title}</h2>
        <p>${item.contents}</p>
      </li></a>`;
  }).join('');
};

const getServerData = async keyword => {
  const API = 'https://en.wikipedia.org/w/api.php';
  const action = `?action=opensearch&format=json&origin=*&search=${keyword}`;
  const searchURL = API + action;

  const response = await fetch(searchURL);
  const data = await response.json();

  const [_, titles, contents, links] = data;

  const searchInfo = titles.map((title, index) => {
    return {
      title,
      contents: contents[index],
      link: links[index]
    };
  });
  display(searchInfo);
};

const handleInput = e => {
  e.preventDefault();
  const text = input.value.trim();

  if (text !== '') {
    icon.classList.add('icon-visible');
    getServerData(text).catch(err => console.error('Server error: ', err));
  }
};

const clearSearchInfo = () => {
  icon.classList.remove('icon-visible');
  // clear input text
  input.value = '';
  ul.innerHTML = '';
};

// Event Listeners
form.removeEventListener('submit', handleInput);
form.addEventListener('submit', handleInput);
icon.removeEventListener('click', clearSearchInfo);
icon.addEventListener('click', clearSearchInfo);
},{"./style.css":5,"./dummy-data":6}]},{},[4])