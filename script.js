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

//Build Bookmarks DOM
function buildBookmarks(){
    //build items
    bookmarks.forEach((bookmark) => {
     const {name, url} = bookmark;
        //Item
        const item = document.createElement('div');
        item.classList.add('item');
        //Close Icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        //Favicon / Link Container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        //Favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `favicon-32x32.png?domain=${url}`);
        favicon.setAttribute('alt', 'favicon');
        //link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;
        //Append to bookmark container
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item);
    });
}

//Fetch bookmarks
function fetchBookmarks(){
    //Get bookmarks from localstorage if available
    if(localStorage.getItem('bookmarks')){
        /*The JSON.parse() method parses a JSON string, 
        constructing the JavaScript value or object described by
        the string.*/ 
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        //Create bookmarks array in localstorage
        bookmarks = [
            {
                name: 'RafiX Design',
                url :'https://rafik-zaidi.github.io/infinitScroll/'
            },
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    buildBookmarks();
}

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
    /*The JSON.stringify() method converts a JavaScript object
    or value to a JSON string*/
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteUrlEl.focus();
}

//Event listener
bookmarkForm.addEventListener('submit', storeBookmark);

//On Load, Fetch Bookmarks
fetchBookmarks();
