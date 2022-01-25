'use strict';

const inputBtn = document.querySelector('#input-btn');
const inputField = document.querySelector('#input-el');
const ulEl = document.querySelector('#ul-el');
const clearBtn = document.querySelector('#clear-btn');
const tabBtn = document.querySelector('#tab-btn');
let myLeads = [];
let oldLeads = [];

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

const renderLeads = function (leads) {
  let listItem = '';
  for (let i = 0; i < leads.length; i++) {
    listItem += `<li>
    <a href="${leads[i]}" target="_blank">${leads[i]}</a>
    </li>`;
  }

  inputField.value = '';
  ulEl.innerHTML = listItem;
};
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLeads(leadsFromLocalStorage);
}
const PushLeads = function () {
  myLeads.push(inputField.value);
  localStorage.setItem('myLeads', JSON.stringify(myLeads));

  renderLeads(myLeads);
};

const clearBtnFun = function () {
  localStorage.clear();
  ulEl.innerHTML = '';
  myLeads = [];
  renderLeads(myLeads);
};

inputBtn.addEventListener('click', PushLeads);

clearBtn.addEventListener('dblclick', clearBtnFun);

tabBtn.addEventListener('dblclick', function () {
  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {});
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const event = tabs[0].url;
    myLeads.push(event);
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    renderLeads(myLeads);
    // console.log(tabs);
  });
});
