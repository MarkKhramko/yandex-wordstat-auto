(function() {

const LOADER_CLASS = "i-popup__content";
const LOADER_COVER_CLASS = "i-popup i-popup_autoclosable_no i-popup_fixed_yes i-bem i-popup_js_inited";
const WORDS_COUNTER_CLASS = "ywa-info_b ywa-info_countWords";
const ADD_ALL_BTN_CLASS = "ywa-addAll";
const CONFIRM_BTN_CLASS = "ywa-btn ywa-btn-primary ywa-blockAddAll_ok";
const NEXT_PAGE_BTN_CLASS = "b-pager__next";

function isElementVisible(el) {
	return (el.offsetParent !== null)
}

function until(conditionFunc, timeInterval = 400){
	return new Promise(resolve => {
		let timer = setInterval(()=>{
			if (conditionFunc() === true){
				clearInterval(timer);
				return resolve(true);
			}
		}, timeInterval);
	});
}

function countWords(){
	const wordsCounterSpan = document.getElementsByClassName(WORDS_COUNTER_CLASS)[0];
	const innerText = wordsCounterSpan.innerHTML === "..." ? "0" : wordsCounterSpan.innerHTML;
	return parseInt(innerText.replace(/ /g, ''));
}

async function collectPageWords(){
	try{
		let currentWordsCount = countWords();

		// Click on first add all btn
		const addAllBtn = document.getElementsByClassName(ADD_ALL_BTN_CLASS)[0];
		addAllBtn.click();

		
		// Wait till confirm btn appears
		await until(()=>{
			const confirmBtn = document.getElementsByClassName(CONFIRM_BTN_CLASS)[0];
			return isElementVisible(confirmBtn);
		});

		// Add all words by clicking confirm button
		document.getElementsByClassName(CONFIRM_BTN_CLASS)[0].click();

		// Wait till words add
		await until(()=>{
			const newNumberOfWords = countWords();
			const condition = currentWordsCount < newNumberOfWords;
			return condition;
		});

		// End
		return true;
	}
	catch(error){
		throw error;
	}
}

async function goToNextPage() {

	try{
		// Click next page
		const nextPageBtn = document.getElementsByClassName(NEXT_PAGE_BTN_CLASS)[0];
		nextPageBtn.click();

		// Wait till loader disapears
		await until(()=>{
			const loaderCover = document.getElementsByClassName(LOADER_COVER_CLASS)[0];
			return isElementVisible(loaderCover) === false;
		});

		// Wait till add button appears
		await until(()=>{
			const addAllBtn = document.getElementsByClassName(ADD_ALL_BTN_CLASS)[0];
			return isElementVisible(addAllBtn) === true;
		});

		// End
		return true;
	}
	catch(error){
		throw error;
	}
}

async function main(){
	try{
		// Repeat for N pages
		for (let i = 0; i < 10; i++){
			console.log("Iteration: " + i);
			await collectPageWords();
			await goToNextPage();
		}
	}
	catch(error){
		console.error("Error: ", { error });
	}
}

console.log("Let's collect automatically!");
main();

})();