const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

//Show Modal, focus on input
function showModal(){
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

//Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));

//Validate Form
function validate(nameValue, urlValue){
    const expression = /((?:https?\:\/\/|www\.)(?:[-a-z0-9]+\.)*[-a-z0-9]+.*)/g;
    const regex = new RegExp(expression);
    if (!nameValue || !urlValue){
        alert('Please submit values for both fields');
        return false;
    }
    if (!urlValue.match(regex)){
        alert('Please provide a valid web address');
        return false;
    }
    //Valid
    return true;
}

//Fetch bookmarks

//Handle Data from form
function storeBookmark(e){
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes('http://', 'https://')){
        urlValue = `https://${urlValue}`;
    }
    if (!validate(nameValue, urlValue)){
        return false;
    }
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };
    bookmarks.push(bookmark);
    console.log(bookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    bookmarkForm.reset();
    websiteUrlEl.focus();
}
//Event listener
bookmarkForm.addEventListener('submit', storeBookmark);
