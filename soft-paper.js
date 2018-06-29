const Paper = {
  split(container, target){
    const paper = document.querySelector(container);
    const paperContent = document.querySelector('.paper-content');
    const contentList = paperContent.cloneNode(true).childNodes;
    paperContent.innerHTML = ''; //Clear Page Content
    this._splitContent(paper, contentList);
  },
  _splitContent(paper, nodeList){
    nodeList.forEach((node) => {
      if(node.textContent){
        const texts = node.textContent.split('');
        this._splitText(paper, texts);
      }
    });
  },
  _splitText(paper, texts){
    const fullTexts = texts.slice(0);
    for(let i = 0; i < texts.length; i++){
      const text = fullTexts.shift();
      paper.innerHTML += text;

      //If overflowed, add text back and put it to next page
      if(this._isOverflowed(paper)){
        paper.innerHTML  = paper.innerHTML.slice(0, -1);
        fullTexts.unshift(text);
        const newPage = paper.cloneNode(false);
        paper.parentNode.appendChild(newPage);
        this._splitText(newPage, fullTexts);
        break;
      }
    }
  },
  _isOverflowed(paper){
    let isOverflow = false;
    if(paper.scrollHeight > paper.clientHeight){
      isOverflow = true;
    }
    return isOverflow;
  },
}

if (typeof window !== 'undefined') {
	window.SoftPaper = Paper;
}else{
  module.exports = Paper;
}
