"use strict";
const code = `const selectName = "select[name='workplace']";
const inputName = "input[name='workplace-filter']";
const options = [];
const select = document.querySelector(selectName);

const insertInput = () => {
  const newElement = document.createElement("div");
  const selectParent = select.parentElement;

  newElement.innerHTML = "<input type='text' placeholder='Search...' name='workplace-filter'>";

  selectParent.prepend(newElement);
};
const getOptions = () => {
  for (let i = 0; i<select.options.length; i++){
	options.push(select.options.item(i));       
  }
}
const removeOptions = () => {
  select.innerHTML ="";
}
const addOptions = (options) => {
  options.forEach(option => {
	select.append(option);
  });
}
const filter = (e) => {
  const filterText = e.target.value;
  const filteredOptions = options.filter(option => option.text.includes(filterText));
  removeOptions();
  addOptions(filteredOptions);
  select.options.selectedIndex = 0;
}

insertInput();
getOptions();

const input = document.querySelector(inputName);
input.addEventListener('input', filter);`;

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  chrome.tabs.executeScript(tabs[0].id, { code });
});
